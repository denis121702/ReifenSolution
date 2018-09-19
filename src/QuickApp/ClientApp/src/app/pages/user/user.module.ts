import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent
  ]
})

export class UserModule { }
