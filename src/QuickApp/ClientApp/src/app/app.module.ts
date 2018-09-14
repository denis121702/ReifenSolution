import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ToastaModule} from 'ngx-toasta';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRouters } from './app.routes';
import {StartComponent} from './pages/start/start.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagerService} from './services/pager.service';
import {BackendService} from './services/backend.service';
import {AuthGuard} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {HttpModule} from '@angular/http';
import {EndpointFactory} from './services/endpoint-factory.service';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AlertService} from './services/alert.service';
import {ConfigurationService} from './services/configuration.service';
import {LocalStoreManager} from './services/local-store-manager.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {HomeLayoutComponent} from './layouts/home-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    HomeLayoutComponent
  ],
  imports: [
    AppRouters,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    ToastaModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthenticationService,
    ConfigurationService,
    LocalStoreManager,
    BackendService,
    PagerService,
    EndpointFactory,
    AlertService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
