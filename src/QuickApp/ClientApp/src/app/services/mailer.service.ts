import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import { PageRequest} from '../models/common/page-request';
import { PageResponse} from '../models/common/page-response';
import {ConfigurationService} from './configuration.service';
import {IMailer} from '../models/mailer';

@Injectable()
export class MailerService {

    private get searchMailersUrl() { return this.configurations.baseUrl + '/assets/rest/mailers.json'; }

    private get getMailerByIdUrl() { return this.configurations.baseUrl + '/assets/rest/mailer.json'; }

    private get getCustomersByMailerIdUrl() { return this.configurations.baseUrl + '/assets/rest/mailer-customer.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    searchMailers(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchMailersUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getCustomersByMailerId(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.getCustomersByMailerIdUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getMailerById(id: string): Observable<IMailer> {
      return this.http.get<IMailer>(this.getMailerByIdUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }
  /*
      saveMailer(mailer: IMailer): Observable<IMailer> {
         return this.update(mailer).map(() => this.extractData).catch(this.handleError);
      }

      deleteMailer(id: string): Observable<Response> {
        const url = `${this.baseUrl}/${id}`;
        return this.delete(id).catch(this.handleError);
    }*/
}
