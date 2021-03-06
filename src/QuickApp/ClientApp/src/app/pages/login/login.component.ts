import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import {AlertService, MessageSeverity, DialogType, AlertDialog, AlertMessage} from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserLogin } from '../../models/user-login.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
/*import {MatSnackBar} from '@angular/material';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  // userLogin = { email: '', password: ''};
  userLogin = new UserLogin();

  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;


  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private authService: AuthService,
              private configurations: ConfigurationService,
              // private snackBar: MatSnackBar
  ) {
  }


  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userLogin.rememberMe = this.authService.rememberMe;

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
        if (this.getShouldRedirect()) {
          this.authService.redirectLoginUser();
        }
      });
    }

    /*this.alertService.getDialogEvent().subscribe(alert => this.showMessage(alert));
    this.alertService.getMessageEvent().subscribe(message => this.showToast(message));
    this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message));*/
  }



  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }


  getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  closeModal() {
    if (this.modalClosedCallback) {
      this.modalClosedCallback();
    }
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    this.authService.login(this.userLogin.email, this.userLogin.password, this.userLogin.rememberMe)
      .subscribe(
        user => {

            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.reset();

              this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);

        },
        error => {

          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {

            this.alertService.showStickyMessage(
              Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
            this.offerAlternateHost();

          } else {

            const errorMessage = Utilities.findHttpResponseMessage('error_description', error);
            if (errorMessage) {
              this.alertService.showStickyMessage('Unable to login', errorMessage, MessageSeverity.error, error);
            } else {
              this.alertService.showStickyMessage('Unable to login',
                'An error occured whilst logging in, please try again later.\nError: '
                + Utilities.getResponseBody(error), MessageSeverity.error, error);
            }
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
  }


  offerAlternateHost() {

    if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
      this.alertService.showDialog('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
        'Would you want to temporarily switch to the online Demo API below?(Or specify another)',
        DialogType.prompt,
        (value: string) => {
          this.configurations.baseUrl = value;
          this.alertService.showStickyMessage('API Changed!', 'The target Web API has been changed to: ' + value, MessageSeverity.warn);
        },
        null,
        null,
        null,
        this.configurations.fallbackBaseUrl);
    }
  }


  reset() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;
    });
  }
}
