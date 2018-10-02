import { Component, OnInit} from '@angular/core';
import {ISettings} from '../../../models/settings';
import {SettingsService} from '../../../services/settings.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-settings-detail',
  templateUrl: './settings-detail.component.html',
  styleUrls: ['./settings-detail.component.scss']
})

export class SettingsDetailComponent implements OnInit {

  errorMessage: string;
  edit = false;
  oldData: any;
  dataView: ISettings = {
    _id: '',
    owncloud: {
      username: '',
      password: '',
      url: '',
      searchFolder: '',
      fileName: '',
      successFolderName: ''
    },
    email: {
      host: '',
      port: '',
      from: '',
      hyperlink: '',
      unsubscribe: '',
      tokenExpires: '',
      auth: {
          user: '',
          pass: '',
      }
    },
    unsubscribes: [{
      label: '',
      description: '',
      value: '',
    }]
  };

  constructor(public settingsService: SettingsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadStyleMasterList('5a1eb9d6d2a5692570fcb574');
  }

  loadStyleMasterList(id: string) {
    this.settingsService.getSettings(id).subscribe((question: ISettings) => {
        this.oldData = Object.assign({}, question);
        this.dataView = Object.assign({}, question);
    }, error => this.errorMessage = <any>error);
  }

  setData(data: any) {
    const i = 1;
  }

  saveEntry() {
    this.onSaveComplete();
    this.edit = false;
  }

  onSaveComplete(): void {
    this.edit = false;
    this.snackBar.open('Changes have been saved ', 'Settings',{ duration: 3000 });
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }
}
