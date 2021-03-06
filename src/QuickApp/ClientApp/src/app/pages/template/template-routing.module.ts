import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplateListComponent} from './template-list/template-list.component';
import {TemplateDetailComponent} from './template-details/template-detail.component';

const routes: Routes = [
  { path: '', component: TemplateListComponent },
  { path: 'details/:id', component: TemplateDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemplateRoutingModule { }

