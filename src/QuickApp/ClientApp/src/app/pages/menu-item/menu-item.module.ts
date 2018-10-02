import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {MenuItemListComponent} from './menu-item-list/menu-item-list.component';
import {MenuItemDetailsComponent} from './menu-item-details/menu-item-details.component';
import {MenuItemRoutingModule} from './menu-item-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MenuItemRoutingModule
  ],
  declarations: [
    MenuItemListComponent,
    MenuItemDetailsComponent
  ]
})
export class MenuItemModule { }
