import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {User} from '../../../models/user.model';
import {AccountService} from '../../../services/account.service';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {Utilities} from '../../../services/utilities';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  errorMessage: string;
  id: string;
  dataView: User = new User();

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
  }

  loadStyleMasterList(id: string) {
    this.alertService.startLoadingMessage();
    this.accountService.getUser(id).subscribe(
        user => this.onCurrentUserDataLoadSuccessful(user),
        error => this.onCurrentUserDataLoadFailed(error)
    );
  }

  private onCurrentUserDataLoadSuccessful(user: User) {
    this.alertService.stopLoadingMessage();
    this.dataView = user;
  }

  private onCurrentUserDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }
}
