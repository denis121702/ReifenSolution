import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {PageRequest} from '../models/common/page-request';
import {ConfigurationService} from './configuration.service';
import {EndpointFactory} from './endpoint-factory.service';
import {PageResponse} from '../models/common/page-response';

@Injectable()
export class CustomerService  extends EndpointFactory {

  private get searchCustomersUrl() { return this.configurations.baseUrl + '/api/customer/getcustomers'; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  searchCustomers(variables: PageRequest) {
    return this.http.post<PageResponse>(this.searchCustomersUrl, variables, this.getRequestHeaders()).pipe<PageResponse>(
      catchError(error => {
        return this.handleError(error, () => this.searchCustomers(variables));
      }));
  }
}
