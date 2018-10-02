import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {QuestionListComponent} from './question-list/question-list.component';
import {QuestionDetailComponent} from './question-details/question-detail.component';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'details/:id', component: QuestionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionRoutingModule { }

