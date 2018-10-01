import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AlertDialog, AlertMessage, AlertService} from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private alertService: AlertService,  private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.alertService.getDialogEvent().subscribe(alert => this.showMessage(alert));
    this.alertService.getMessageEvent().subscribe(message => this.showToast(message));
    this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message));
  }

  showToast(message: AlertMessage) {
    if (message) {
      this.snackBar.open(message.summary, message.detail, {
        duration: 3000,
      });
    }
  }

  showMessage (dialog: AlertDialog) {
    if (dialog) {
      this.snackBar.open(dialog.message, dialog.type.toString(), {
        duration: 3000,
      });
    }
  }
}
