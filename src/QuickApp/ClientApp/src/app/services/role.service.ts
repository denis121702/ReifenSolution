import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {IRole} from '../models/role';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class RoleService {

    private get searchRolesUrl() { return this.configurations.baseUrl + '/assets/rest/roles.json'; }

    private get getRoleByIdUrl() { return this.configurations.baseUrl + '/assets/rest/role.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    searchRoles(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchRolesUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getRoleById(id: string): Observable<IRole> {
      return this.http.get<IRole>(this.getRoleByIdUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }
}
