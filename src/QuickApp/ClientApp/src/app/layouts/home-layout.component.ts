import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.css']
})

export class HomeLayoutComponent {

  constructor(private authService: AuthService) { }

  onLogout() {
      this.authService.logout();
      this.authService.redirectLogoutUser();
  }

}
