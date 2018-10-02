import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsDetailComponent} from './settings-details/settings-detail.component';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsDetailComponent
  ]
})

export class SettingsModule { }
