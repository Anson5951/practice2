import { Component, OnInit } from '@angular/core';

import { MemberService } from "../../service/member.service";
import { Member } from 'src/app/class/member';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.sass']
})
export class MemberDetailComponent implements OnInit {

  //member: Member;
  member$: Observable<Member>;

  constructor(private memberService: MemberService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember() {
    this.member$ = <Observable<Member>>this.route.paramMap.pipe(
      tap((x: ParamMap) => console.log('from id : ' + x.get('id'))),
      switchMap((param: ParamMap) => this.memberService.getMember$(Number(param.get('id'))))
    );
    //this.member$.subscribe( data => this.member = <Member>data);
  }

}
