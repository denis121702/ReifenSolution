import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog, MatSnackBar} from '@angular/material';
import {DialogMessage} from '../../shared/dialogs/confirm-dialog/dialog-message';
import {ConfirmDialogComponent} from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  public isVendor = true;
  public isSent = false;
  public userData = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    repeatPassword: '',
    accountType: '',
    vendorName: '',
    vendorId: '',
    hasTaCAccepted: false
  };

  errors: { [key: string]: string } = {
    requiredFirstName: 'First name is required',
    firstName: 'First name must be between 3 and 128 characters',
    // ---
    requiredLastName: 'Last name is required',
    lastName: 'Last name must be between 3 and 128 characters',
    // ---
    requiredUserName: 'User name is required',
    userName: 'User name must be between 3 and 128 characters',
    // ---
    email: 'Email must be a valid email address (username@domain)',
    requiredEmail: 'Email is required',
    confirmEmail: 'Email addresses must match',
    // ---
    requiredPassword: 'Password is required',
    password: 'Password must be at least 8 characters in length and contain at least one number and special character',
    repeatPassword: 'Passwords must match'
  };
  userRegistrationForm: FormGroup;

  constructor(private auth: AuthenticationService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      email: ['', [
          Validators.required,
          Validators.email
      ]],
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.pattern(regExps.password)
        ]],
        repeatPassword: ['', Validators.required]
      }, { validator: this.matchingPasswords })
    });
  }

  matchingPasswords( control: AbstractControl ) {
    const password = control.get( 'password' );
    const confirm = control.get( 'repeatPassword' );

    if ( !password || !confirm ) {
      return null;
    }

    return password.value === confirm.value ? null : { nomatch: true };
  }

  register() {
    this.auth.register(this.userData).subscribe(r => { this.isSent = true; });
  }

  onAccountTypeChanged($event) {
    this.isVendor = !this.isVendor;
  }

  showTaC() {
    const msg: DialogMessage = {
      title: 'Terms & Conditions',
      message: 'Make sure you always follow the rules set by ACE\'s IT Security.',
      confirmText: '',
      export: false
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px', data: msg });
    dialogRef.afterClosed().subscribe(result => {});
  }
}

export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/
};
