import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsDetailComponent} from './settings-details/settings-detail.component';

const routes: Routes = [
  { path: '', component: SettingsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class SettingsRoutingModule { }

