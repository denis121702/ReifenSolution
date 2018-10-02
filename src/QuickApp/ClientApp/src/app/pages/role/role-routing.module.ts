import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleDetailsComponent} from './role-details/role-details.component';

const routes: Routes = [
  { path: '', component: RoleListComponent },
  { path: 'details/:id', component: RoleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoleRoutingModule { }
