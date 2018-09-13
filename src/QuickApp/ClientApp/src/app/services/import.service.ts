import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {IImport} from '../models/import';
import {GlobalSettings} from '../global-settings';

@Injectable()
export class ImportService extends BackendService {

   constructor(public http: Http) {
      super(http, GlobalSettings.AUTH_API_ENDPOINT + '/imports');
   }

    getImports(): Observable<IImport[]> {
        return this.getAll()
            .map(this.extractData)
            .catch(this.handleError);
    }

    searchImports(variables: PageRequest): Observable<PageResponse> {
        return this.search(variables)
                   .map(this.extractDataSearch)
                   .catch(this.handleError);
    }

    getImport(id: string): Observable<IImport> {
        if (!id) {
            return Observable.of(this.initialize());
        }
        return this.getById(id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    initialize(): IImport {
       return {
              _id: null,
             timestamp: new Date(),
             fileLastModified: new Date(),
             filePath: null,
             totalCountRecords: 0,
             successCountRecords: 0,
             errorCountRecords: 0
        };
    }
}
