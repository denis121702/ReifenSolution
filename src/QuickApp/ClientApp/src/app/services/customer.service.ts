import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {ConfigurationService} from './configuration.service';
import {EndpointFactory} from './endpoint-factory.service';
import {PageResponse} from '../models/common/page-response';
import {ICustomer} from '../models/customer';
import {CodeList} from '../models/common/code-list';

@Injectable()
export class CustomerService  extends EndpointFactory {

  get searchCustomersUrl() { return this.configurations.baseUrl + '/api/customer/search'; }

  get customerUrl() { return this.configurations.baseUrl + '/api/customer'; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
  }

  getCodeList(sortActive: string): Observable<CodeList[]> {
    const endpointUrl = `${this.customerUrl}/codelist/${sortActive}`;

    return this.http.get<any[]>(endpointUrl, this.getRequestHeaders()).pipe<CodeList[]>(
      catchError(error => {
        return this.handleError(error, () => this.getCodeList(sortActive));
      }));
  }

  saveCustomer(customer: ICustomer) {
    if (customer.id) {
      return this.updateCustomer(customer.id.toString(), customer);
    } else {
      return this.createCustomer(customer);
    }
  }

  searchCustomers(variables: PageRequest): Observable<PageResponse> {
    return this.http.post<PageResponse>(this.searchCustomersUrl, variables, this.getRequestHeaders()).pipe<PageResponse>(
      catchError(error => {
        return this.handleError(error, () => this.searchCustomers(variables));
      }));
  }

  getCustomerById(customerId: string): Observable<ICustomer> {
    if (!customerId) {
      return Observable.of(this.initialize());
    }

    const endpointUrl = `${this.customerUrl}/${customerId}`;

    return this.http.get<ICustomer>(endpointUrl, this.getRequestHeaders()).pipe<ICustomer>(
      catchError(error => {
        return this.handleError(error, () => this.getCustomerById(customerId));
      }));
  }

  private updateCustomer(customerId: string, customer: ICustomer): Observable<number> {
    const endpointUrl = `${this.customerUrl}/${customerId}`;

    return this.http.put<ICustomer>(endpointUrl, JSON.stringify(customer), this.getRequestHeaders()).pipe<number>(
      catchError(error => {
        return this.handleError(error, () => this.updateCustomer(customerId, customer));
      }));
  }

  private createCustomer(customer: ICustomer): Observable<number> {
    const endpointUrl = `${this.customerUrl}`;

    return this.http.post<ICustomer>(endpointUrl, JSON.stringify(customer), this.getRequestHeaders()).pipe<number>(
      catchError(error => {
        return this.handleError(error, () => this.createCustomer(customer));
      }));
  }

  private initialize(): ICustomer {
    const myObject = {
      updatedDate: new Date(),
      createdDate: new Date()
    } as ICustomer;
    return myObject;
  }
}
