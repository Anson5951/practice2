import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isInputError: boolean;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: [''],
      password: ['']
    })
    this.isInputError = true;
  }

  login() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      isLogin => {
        if (isLogin) {
          console.log("auth correct. redirect to '" + this.authService.redirectUrl + "'");
          this.router.navigate([this.authService.redirectUrl])
        }
        else {
          this.isInputError = false
        }
      }
    );
  }
}
