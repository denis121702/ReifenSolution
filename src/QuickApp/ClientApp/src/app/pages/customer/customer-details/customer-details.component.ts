import { Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {Utilities} from '../../../services/utilities';
import {ICustomer} from '../../../models/customer';
import {CustomerService} from '../../../services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})

export class CustomerDetailsComponent implements OnInit {

  errorMessage: string;
  id: string;
  edit = true;
  dataView: ICustomer = {} as ICustomer;
  oldData: any;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private alertService: AlertService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
  }

  loadStyleMasterList(id: string) {
    this.alertService.startLoadingMessage();
    this.customerService.getCustomerById(id).subscribe(
      customer => this.onCurrentUserDataLoadSuccessful(customer),
      error => this.onCurrentUserDataLoadFailed(error)
    );
  }

  onCurrentUserDataLoadSuccessful(customer: ICustomer) {
    this.alertService.stopLoadingMessage();
    this.dataView = customer;
    this.oldData = Object.assign({}, customer);
  }

  onCurrentUserDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  saveEntry() {
    this.alertService.startLoadingMessage('Saving changes...');
    this.customerService.saveCustomer(this.dataView).subscribe(
      response => this.onSaveComplete(response),
      error => this.saveFailedHelper(error)
    );
  }

  onSaveComplete(response: any) {
    this.edit = false;
    this.snackBar.open('Changes have been saved ', 'Customer',{ duration: 2000 });
    this.alertService.stopLoadingMessage();
    if (response) {
      this.alertService.showMessage('Success', `User \"${this.dataView.name}\" was created successfully`, MessageSeverity.success);
    } else {
      this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error);
    }
  }

  saveFailedHelper(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  editEntry() {
    this.edit = false;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = true;
  }

  downloadPdf() {

  }
}
