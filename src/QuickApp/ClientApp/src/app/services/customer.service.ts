import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class CustomerService {

  private get searchCustomersUrl() { return this.configurations.baseUrl + '/assets/rest/customers.json'; }

  constructor(public http: HttpClient, protected configurations: ConfigurationService) {
  }

/*  constructor(private router: Router,
              private http: HttpClient,
              private customerEndpoint: CustomerEndpoint) {
  }*/

  searchCustomers(variables: PageRequest) {
    /*return this.customerEndpoint.getCustomers<PageResponse>(variables);*/
    return this.http.get<PageResponse>(this.searchCustomersUrl)
      .pipe(
        catchError(e => throwError(e))
      );
  }
}
