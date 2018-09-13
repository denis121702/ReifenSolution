import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DialogMessage } from './dialog-message';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogMessage,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close('confirm');
  }
}
