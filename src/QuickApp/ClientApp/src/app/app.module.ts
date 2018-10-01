import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ToastaModule} from 'ngx-toasta';
import {ChartsModule} from 'ng2-charts';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AppRouters } from './app.routes';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {PagerService} from './services/pager.service';
import {AuthGuard} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {EndpointFactory} from './services/endpoint-factory.service';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AlertService} from './services/alert.service';
import {ConfigurationService} from './services/configuration.service';
import {LocalStoreManager} from './services/local-store-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {HomeLayoutComponent} from './layouts/home-layout.component';
import {AccountEndpoint} from './services/account-endpoint.service';
import {AccountService} from './services/account.service';
import {CustomerEndpoint} from './services/customer-endpoint.service';
import {CustomerService} from './services/customer.service';
import {MailerService} from './services/mailer.service';
import {MenuItemService} from './services/menu-item.service';
import {ConfirmDialogComponent} from './shared/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    HomeLayoutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    AppRouters,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    ChartsModule,
    ToastaModule.forRoot(),
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthenticationService,
    ConfigurationService,
    LocalStoreManager,
    MailerService,
    PagerService,
    EndpointFactory,
    AlertService,
    AccountEndpoint,
    AccountService,
    CustomerEndpoint,
    CustomerService,
    MenuItemService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
