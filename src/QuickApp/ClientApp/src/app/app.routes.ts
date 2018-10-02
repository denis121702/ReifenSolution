import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './services/auth-guard.service';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthService} from './services/auth.service';
import {HomeLayoutComponent} from './layouts/home-layout.component';

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      /*{path: '', component: WelcomeComponent},*/
      {path: '', component: HomeComponent},
      {path: 'customers', loadChildren: './pages/customer/customer.module#CustomerModule'},
      {path: 'mailers', loadChildren: './pages/mailer/mailer.module#MailerModule' },
      {path: 'questions', loadChildren: './pages/question/question.module#QuestionModule' },
      {path: 'templates', loadChildren: './pages/template/template.module#TemplateModule' },
      {path: 'admin/users', loadChildren: './pages/user/user.module#UserModule'},
      {path: 'admin/settings', loadChildren: './pages/settings/settings.module#SettingsModule' },
      {path: 'admin/roles', loadChildren: './pages/role/role.module#RoleModule'},
      {path: 'admin/menuitems', loadChildren: './pages/menu-item/menu-item.module#MenuItemModule'},
      {path: 'admin/logs', loadChildren: './pages/log/log.module#LogModule'}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})

export class AppRouters {}
