import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map, tap, find } from 'rxjs/operators';

import { Member } from "../class/member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[];

  constructor(private http: HttpClient) { }

  getMembers$() {
    return this.http.get('/assets/member.json');
  }

  getMember$(id: number | string) {
    return this.http.get('/assets/member.json').pipe(
      tap(_ => console.log('service get id : ' + id)),
      map((members: Member[]) => members.find( member => member.id === id))
    )
  }
}
