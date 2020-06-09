import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MemberService } from '../service/member.service';

import { Member } from "../class/member";
import { EditType } from '../enum/edit-type.enum';
import { Constants } from "../class/constants";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.sass']
})
export class MemberListComponent implements OnInit, OnDestroy {

  members: Member[];
  create: EditType.Create;
  modify: EditType.Modify;

  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMembers();
    this.fromDetail();
  }

  ngOnDestroy(): void {
    sessionStorage.setItem(Constants.MemberListStorageKey, JSON.stringify(this.members));
  }

  getMembers() {
    let members = sessionStorage.getItem(Constants.MemberListStorageKey)
    if (members) {
      console.log('member-list get list from sessionStorage')
      this.members = <Member[]>(JSON.parse(members));
      // sessionStorage.removeItem(this.memberListStorageKey);
    }
    else {
      console.log('member-list get list from service')
      this.memberService.getMembers$().subscribe(members => {
        this.members = <Member[]>members;
      });
    }
  }

  fromDetail() {
    let paramMap = this.route.snapshot.paramMap;
    console.log('member-list get values : ' + JSON.stringify(paramMap))
    let member = new Member()
    member.department = paramMap.get('department')
    member.mail = paramMap.get('mail')
    member.name = paramMap.get('name')
    member.phone = +paramMap.get('phone')
    if (paramMap.get('type') === EditType.Modify) {
      member.id = +paramMap.get('id')
      let index = this.members.findIndex(value => value.id === member.id)
      console.log('replace index(' + index + ')')
      this.members[index] = member;
    }
    else if(paramMap.get('type') === EditType.Create) {
      this.members.push(member)
      let index = this.members.findIndex(value => value.name === member.name)
      console.log('push new member at index : ' + index)
      member.id = this.members.length
    }
  }
}
