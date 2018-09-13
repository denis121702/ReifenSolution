import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {PageRequest} from '../models/common/page-request';

@Injectable()
export class BackendService {

    constructor(public http: Http, public baseUrl: string) {}

    getAll() {
        return this.http.get(this.baseUrl, this.jwt()).map((response: Response) => response.json());
    }

    getById(id: string) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url, this.jwt()).map((response: Response) => response.json());
    }

    search(data: PageRequest, path?: string) {
      const url = path ? path + '/search' : '/search';
      return this.http.post(this.baseUrl + url, data, this.jwt()).map((response: Response) => response.json());
    }

    create(data: any) {
        return this.http.post(this.baseUrl, data, this.jwt()).map((response: Response) => response);
    }

    update(data: any) {
        const url = `${this.baseUrl}/${data._id}`;
        console.log(data.label);
        return this.http.put(url, data, this.jwt()).map((response: Response) => response);
    }

    delete(id: string) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, this.jwt()).map((response: Response) => response);
    }

    getAllPath(path?: string) {
      return this.http.post(this.baseUrl + path, null, this.jwt()).map((response: Response) => response.json());
    }

    public jwt() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // create authorization header with jwt token
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          headers.append('Authorization', 'Bearer ' + currentUser.token);
      }
      return new RequestOptions({ headers: headers });
    }

    public extractData(response: Response) {
        const body = response.json ? response.json() : response;
        return body || {};
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public extractDataSearch(response: Response) {
      if (response.status === 200) {
          return {};
      } else {
          const body = response.json ? response.json() : response;
          return (body || {});
      }
    }
}
