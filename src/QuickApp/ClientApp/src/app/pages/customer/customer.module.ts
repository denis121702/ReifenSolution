import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerRoutingModule} from './customer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CustomerRoutingModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent
  ]
})

export class CustomerModule { }
