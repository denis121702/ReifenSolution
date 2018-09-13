import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import {GlobalSettings} from '../global-settings';
import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {ILog} from '../models/log';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class LogService extends BackendService {

    constructor(public http: Http) {
        super(http, GlobalSettings.AUTH_API_ENDPOINT + '/logs');
    }

    searchLogs(variables: PageRequest): Observable<PageResponse> {
        return this.search(variables)
             .map(this.extractDataSearch)
             .catch(this.handleError);
    }

    getLogById(id: string): Observable<ILog> {
        return this.getById(id)
            .map(this.extractData)
            .catch(this.handleError);
    }

}
