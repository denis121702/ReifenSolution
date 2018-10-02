import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {IMenuItem} from '../models/menu-item';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class MenuItemService {

    private get searchMenuItemsUrl() { return this.configurations.baseUrl + '/assets/rest/menus.json'; }

    private get getMenuItemByIdUrl() { return this.configurations.baseUrl + '/assets/rest/menu.json'; }

    private get findAllUrl() { return this.configurations.baseUrl + '/assets/rest/startmenu.json'; }

    constructor(public http: HttpClient, protected configurations: ConfigurationService) {
    }

    findAll(): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.findAllUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    searchMenuItems(variables: PageRequest): Observable<PageResponse> {
      return this.http.get<PageResponse>(this.searchMenuItemsUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

    getMenuItemById(id: string): Observable<IMenuItem> {
      return this.http.get<IMenuItem>(this.getMenuItemByIdUrl)
        .pipe(
          catchError(e => throwError(e))
        );
    }

}
