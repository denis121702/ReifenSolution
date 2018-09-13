import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRouters,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    BackendService,
    PagerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
