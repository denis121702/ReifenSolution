import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {ConfigurationService} from './configuration.service';
import {IQuestion} from '../models/question';

@Injectable()
export class QuestionService {

    private get searchQuestionsUrl() { return this.configurations.baseUrl + '/assets/rest/questions.json'; }

    private get getQuestionUrl() { return this.configurations.baseUrl + '/assets/rest/question.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    searchQuestions(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchQuestionsUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getQuestion(id: string): Observable<IQuestion> {
      return this.http.get<IQuestion>(this.getQuestionUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

}
