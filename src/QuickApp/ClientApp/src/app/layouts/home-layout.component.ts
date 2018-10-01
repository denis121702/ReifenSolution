import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MenuItemService} from '../services/menu-item.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss']
})

export class HomeLayoutComponent implements OnInit {

  errorMessage: string;
  public menuData: any[];
  /*  = [
    {
      name: 'Workspace',
      items: [
        {
          name: 'dashboard',
          route: 'dashboard',
          icon: 'dashboard'
        },
        {
          name: 'customers',
          route: 'customers',
          icon: 'border_color'
        }
      ]
    }, {
      name: 'Administration',
      items: [
        {
          name: 'Users',
          route: 'admin/users',
          icon: 'person'
        },
        {
          name: 'Logs',
          route: 'logs',
          icon: 'list'
        },
        {
          name: 'Users',
          route: 'users',
          icon: 'person'
        }
      ]
    }
  ];*/

  constructor(public authService: AuthService,
              public menuItemService: MenuItemService) {
  }

  ngOnInit() {
   this.menuItemService.findAll().subscribe((res: any) => {
        this.menuData = res;
    }, error => this.errorMessage = <any>error);
  }

  onLogout() {
      this.authService.logout();
      this.authService.redirectLogoutUser();
  }

}
