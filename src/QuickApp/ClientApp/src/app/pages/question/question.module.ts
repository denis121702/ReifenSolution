import { NgModule } from '@angular/core';

import {QuestionRoutingModule} from './question-routing.module';
import {QuestionListComponent} from './question-list/question-list.component';
import {SharedModule} from '../../shared/shared.module';
import {QuestionDetailComponent} from './question-details/question-detail.component';

@NgModule({
  imports: [
    SharedModule,
    QuestionRoutingModule
  ],
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent
  ]
})
export class QuestionModule { }
