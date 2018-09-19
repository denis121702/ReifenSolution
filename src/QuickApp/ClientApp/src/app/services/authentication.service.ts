import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GlobalSettings } from '../global-settings';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

    login(userName: string, password: string) {
      return this.http.post(`${GlobalSettings.AUTH_API_ENDPOINT}/users/authenticate`, { userName: userName, password: password })
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          const user = response.json();
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
        });
    }

    logout() {
        // remove user from local storage to user user out
        localStorage.removeItem('currentUser');
    }

    register(user: any) {
      return this.http.post(`${GlobalSettings.AUTH_API_ENDPOINT}/users/register`, user)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          return response;
        });
    }
}
