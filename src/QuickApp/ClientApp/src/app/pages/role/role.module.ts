import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleDetailsComponent} from './role-details/role-details.component';
import {RoleRoutingModule} from './role-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule
  ],
  declarations: [
    RoleListComponent,
    RoleDetailsComponent
  ]
})
export class RoleModule { }
