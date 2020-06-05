import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListComponent } from "./member-list/member-list.component";
import { MemberDetailComponent } from './member-list/member-detail/member-detail.component';


const routes: Routes = [
  {
    path: 'member',
    children: [
      {
        path: '',
        component: MemberListComponent
      },
      {
        path: 'detail/:id',
        component: MemberDetailComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
