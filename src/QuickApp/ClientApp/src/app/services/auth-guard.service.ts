import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {IUser} from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

    currentUser(): IUser {
      if (localStorage.getItem('currentUser')) {
        return JSON.parse(localStorage.getItem('currentUser'));
      }
      return new IUser();
    }

    isLoggedIn() {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      } // else { return true; }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      }
      console.log(state.url);
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
}
