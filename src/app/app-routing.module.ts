import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberDetailComponent } from './member-list/member-detail/member-detail.component';
import { LoginComponent } from "./auth/login/login.component";


const routes: Routes = [
  {
    path: 'member',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MemberListComponent
      },
      {
        path: 'detail/:type/:id',
        component: MemberDetailComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
