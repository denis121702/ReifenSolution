import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TemplateRoutingModule} from './template-routing.module';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateDetailComponent} from './template-details/template-detail.component';

@NgModule({
  imports: [
    SharedModule,
    TemplateRoutingModule
  ],
  declarations: [
    TemplateListComponent,
    TemplateDetailComponent
  ]
})

export class TemplateModule { }
