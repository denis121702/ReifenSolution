import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {CustomerEndpoint} from './customer-endpoint.service';
import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';

@Injectable()
export class CustomerService {

  constructor(private router: Router,
              private http: HttpClient,
              private customerEndpoint: CustomerEndpoint) {
  }

  searchCustomers(variables: PageRequest) {
    return this.customerEndpoint.getCustomers<PageResponse>(variables);
  }
}
