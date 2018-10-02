import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {ConfigurationService} from './configuration.service';
import {ITemplate} from '../models/template';

@Injectable()
export class TemplateService {

    private get searchTemplatesUrl() { return this.configurations.baseUrl + '/assets/rest/templates.json'; }

    private get getTemplateUrl() { return this.configurations.baseUrl + '/assets/rest/template.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    searchTemplates(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchTemplatesUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getTemplate(id: string): Observable<ITemplate> {
      return this.http.get<ITemplate>(this.getTemplateUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }
}
