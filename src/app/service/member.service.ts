import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';

import { Member } from "../class/member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMembers$() {
    return this.http.get('/assets/member.json');
  }

  getMember$(id: number | string) {
    return this.http.get('/assets/member.json').pipe(
      map((members: Member[]) => members.filter( member => member.id !== id)[0])
    )
  }
}
