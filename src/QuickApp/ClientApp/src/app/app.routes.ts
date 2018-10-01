import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {WelcomeComponent} from './pages/welcome/welcome.component';
import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AuthService} from './services/auth.service';
import {HomeLayoutComponent} from './layouts/home-layout.component';

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      /*{path: '', component: WelcomeComponent},*/
      {path: '', component: HomeComponent},
      {path: 'customers', loadChildren: './pages/customer/customer.module#CustomerModule'},
      {path: 'admin/users', loadChildren: './pages/user/user.module#UserModule'},
      {path: 'mailers', loadChildren: './pages/mailer/mailer.module#MailerModule' }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/'}
];

/*const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard], data: { title: 'welcome' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }
];*/


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})

export class AppRouters {}
