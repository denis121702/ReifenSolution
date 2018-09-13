import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';
import {GlobalSettings} from '../global-settings';
import {PageRequest} from '../models/common/page-request';
import {PageResponse} from '../models/common/page-response';
import {IUser} from '../models/user';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService extends BackendService {

    constructor(public http: Http) {
        super(http, GlobalSettings.AUTH_API_ENDPOINT + '/users');
    }

    searchUsers(variables: PageRequest): Observable<PageResponse> {
        return this.search(variables)
                   .map(this.extractDataSearch)
                   .catch(this.handleError);
    }

    getUserById(id: string): Observable<IUser> {
        if (!id) {
            return Observable.of(this.initializeUser());
        }

        return this.getById(id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteUser(id: string): Observable<Response> {
        return this.delete(id).catch(this.handleError);
    }

    saveUser(user: IUser): Observable<IUser> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (!user._id) {
            return this.createUser(user, options);
        }
        return this.updateUser(user, options);
    }

    forgotPassword(email: string): Observable<string> {
      const forgotPasswordUrl = '/forgotPassword';
      return this.http.post(this.baseUrl + forgotPasswordUrl, { email: email })
                  .map(this.extractDataSearch)
                  .catch(this.handleError);
    }

    private createUser(user: IUser, options: RequestOptions): Observable<IUser> {
        user._id = '';
        return this.create(user)
            .map(this.extractDataSearch)
            .catch(this.handleError);
    }

    private updateUser(user: IUser, options: RequestOptions): Observable<IUser> {
        return this.update(user)
            .map(() => user)
            .catch(this.handleError);
    }

    initializeUser(): IUser {
       return {
          _id: null,
          email: '',
          token: null,
          userName: null,
          password: null,
          firstName: null,
          lastName: null,
          lastLogin: new Date,
          timestamp: new Date,
          isActive: false,
          isAdmin: false,
          roles: []
        };
    }
}
