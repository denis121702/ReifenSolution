import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuItemDetailsComponent} from './menu-item-details/menu-item-details.component';
import {MenuItemListComponent} from './menu-item-list/menu-item-list.component';

const routes: Routes = [
  { path: '', component: MenuItemListComponent },
  { path: 'details/:id', component: MenuItemDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenuItemRoutingModule { }
