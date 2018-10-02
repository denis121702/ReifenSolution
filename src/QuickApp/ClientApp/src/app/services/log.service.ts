import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {ILog} from '../models/log';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class LogService {

    private get searchLogsUrl() { return this.configurations.baseUrl + '/assets/rest/logs.json'; }

    private get getLogByIdUrl() { return this.configurations.baseUrl + '/assets/rest/log.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    searchLogs(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchLogsUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getLogById(id: string): Observable<ILog> {
      return this.http.get<ILog>(this.getLogByIdUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

}
