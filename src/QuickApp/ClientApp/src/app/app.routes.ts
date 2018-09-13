import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {AuthGuard} from './services/auth-guard.service';
import {StartComponent} from './pages/start/start.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';


const routes: Routes = [
  {path: '', component: StartComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'dashboard', component: DashboardComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouters {}
