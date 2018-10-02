import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {ISettings} from '../models/settings';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class SettingsService {

    private get getSettingsUrl() { return this.configurations.baseUrl + '/assets/rest/setting.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    getSettings(id: string): Observable<ISettings> {
      return this.http.get<ISettings>(this.getSettingsUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }
}
