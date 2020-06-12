import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { MemberListComponent } from "./member-list/member-list.component";
import { MemberDetailComponent } from './member-list/member-detail/member-detail.component';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'member',
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
