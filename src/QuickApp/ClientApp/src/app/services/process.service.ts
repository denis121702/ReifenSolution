import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import {GlobalSettings} from '../global-settings';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProcessService extends BackendService {

    constructor(public http: Http) {
      super(http, GlobalSettings.AUTH_API_ENDPOINT + '/process');
    }

    execImportCsv(): Observable<string> {
        const execImportCsv = '/importcsv';
        return this.http.get(this.baseUrl + execImportCsv, this.jwt()).map((response: Response) => response.json());
    }

    execSendEmail(): Observable<string> {
        const sendEmail = '/sendemail';
        return this.http.get(this.baseUrl + sendEmail, this.jwt()).map((response: Response) => response.json());
    }

    execExportCsv(_id: string): Observable<string> {
        const exportCsv = `${this.baseUrl}/exportCsv/${_id}`;
        return this.http.get(exportCsv, this.jwt()).map((response: Response) => response.json());
    }

    checkSendMailStatus(): Observable<boolean> {
      const checkSendMailStatus = '/checkSendMailStatus';
      return this.http.get(this.baseUrl + checkSendMailStatus, this.jwt()).map((response: Response) => response.json());
    }
}
