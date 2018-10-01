import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import { PageResponse} from '../models/common/page-response';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class MenuItemService {

  private get findAllUrl() { return this.configurations.baseUrl + '/assets/rest/menu.json'; }

  constructor(public http: HttpClient, protected configurations: ConfigurationService) {
  }

  findAll(): Observable<PageResponse> {
    return this.http.get<PageResponse>(this.findAllUrl)
      .pipe(
        catchError(e => throwError(e))
      );
  }
}
