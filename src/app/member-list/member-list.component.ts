import { Component, OnInit } from '@angular/core';

import { MemberService } from '../service/member.service';

import { Member } from "../class/member";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.sass']
})
export class MemberListComponent implements OnInit {

  members: Member[];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers$().subscribe(members => this.members = <Member[]>members);
  }
}
