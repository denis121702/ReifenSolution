import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CustomerEndpoint extends EndpointFactory {

  private readonly _getCustomersUrl: string = '/api/customer/getcustomers';

  get customersUrl() { return this.configurations.baseUrl + this._getCustomersUrl; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getCustomers<T>(userObject: any): Observable<T> {
    return this.http.post<T>(this.customersUrl, userObject, this.getRequestHeaders()).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getCustomers<T>(userObject));
      }));
  }
}
