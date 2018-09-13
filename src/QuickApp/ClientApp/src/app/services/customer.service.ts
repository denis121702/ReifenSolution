import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import {GlobalSettings} from '../global-settings';
import {ICustomer } from '../models/customer';
import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomerService extends BackendService {

    constructor(public http: Http) {
        super(http, GlobalSettings.AUTH_API_ENDPOINT + '/customers');
    }

    getCustomers(): Observable<ICustomer[]> {
        return this.getAll()
                  .map(this.extractData)
                  .catch(this.handleError);
    }

    searchCustomers(variables: PageRequest): Observable<PageResponse> {
        return this.search(variables)
                   .map(this.extractDataSearch)
                   .catch(this.handleError);
    }

    getCustomer(id: string): Observable<ICustomer> {
        if (!id) {
            return Observable.of(this.initializeCustomer());
        }

        return this.getById(id)
            .map(this.extractData)
            .do(data => console.log('getCustomer: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteCustomer(id: string): Observable<Response> {
        const url = `${this.baseUrl}/${id}`;
        return this.delete(id).catch(this.handleError);
    }

    saveCustomer(customer: ICustomer): Observable<ICustomer> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (!customer._id) {
            return this.createCustomer(customer, options);
        }
        return this.updateCustomer(customer, options);
    }

    private createCustomer(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        customer._id = 'undefined';
        return this.create(customer)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private updateCustomer(customer: ICustomer, options: RequestOptions): Observable<ICustomer> {
        return this.update(customer)
            .map(() => customer)
            .catch(this.handleError);
    }

    initializeCustomer(): ICustomer {
       return {
          _id: null,
           customerId: null,
           firmenname: null,
           contactId: null,
           anrede: null,
           vorname: null,
           nachname: null,
           email: null,
           status: null,
           rating: null,
           unsubscribeStatus: 0,
           sendMailStatus: false,
           token: null,
           isMainQuestionAnswered: false
        };
    }
}
