import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit  {

  menuData: any[] = [
    { name: 'App.Home', items:
      [{ route: 'home', icon: 'home', title: 'home' }, { route: 'dashboard', icon: 'dashboard', title: 'dashboard' }]
    },
    { name: 'App.Admin', items:
      [{ route: 'user', icon: 'user', title: 'user' }, { route: 'role', icon: 'role', title: 'role' }]
    }
  ];

  constructor(
    public authGuard: AuthGuard,
    public authSvc: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    /*this.menuItemService.findAll().subscribe((res: any) => {
      console.log('StartComponent');
      if (res) {
        this.menuData = res;
        localStorage.setItem(StorageKeys.MENU_ITEMS, JSON.stringify(res));
        if (this.router.url === '/') {
          this.router.navigate([this.returnUrl]);
        }
      }
    }, error => this.errorMessage = <any>error);*/
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
