import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = false;
  correctAccount = {
    account: "123",
    password: "123"
  }
  // store the URL so we can redirect after logging in
  redirectUrl: string = '';

  login(input: any): Observable<boolean> {
    console.log("input : " + JSON.stringify(input));
    console.log("correctAccount : " + JSON.stringify(this.correctAccount));
    this.isLoggedIn = (JSON.stringify(input) === JSON.stringify(this.correctAccount))
    console.log('is equals : ' + this.isLoggedIn)
    return of(this.isLoggedIn).pipe(
      delay(1000)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log('service logged you out.')
  }
}
