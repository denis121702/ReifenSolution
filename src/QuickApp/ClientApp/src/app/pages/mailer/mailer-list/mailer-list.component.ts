import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/rx';
import {MatPaginator, MatSort, MatSnackBar, MatDialog} from '@angular/material';

import {PageRequest} from '../../../models/common/page-request';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TableDataSource} from '../../../services/tableDataSource';
import {MailerService} from '../../../services/mailer.service';
import {IMailer} from '../../../models/mailer';
import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {DialogMessage} from '../../../shared/dialogs/confirm-dialog/dialog-message';

@Component({
  selector: 'app-mailer-list',
  templateUrl: './mailer-list.component.html',
  styleUrls: ['./mailer-list.component.scss']
})

export class MailerListComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: TableDataSource | null;
  displayedColumns = [
    'actions',
    'timestamp',
    'label',
    'successCustomersCount',
    'failureCustomersCount',
    'votesCount',
    'questionsCount',
    'tokenExpiresDays',
    'status',
    'npsValue',
    'responseRateValue'
  ];
  count = 0;
  errorMessage: string;
  resourceSelector: BehaviorSubject<IMailer[]> = new BehaviorSubject<IMailer[]>([]);
  filterChange = new BehaviorSubject('');

  constructor(public mailerService: MailerService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    Observable.merge(
      this.paginator.page,
      this.filterChange,
      this.sort.sortChange).subscribe(customers => {
        const pageRequest = new PageRequest();
        pageRequest.startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        pageRequest.pageSize = this.paginator.pageSize;
        pageRequest.sortActive = this.sort.active;
        pageRequest.sortDirection = this.sort.direction;
        pageRequest.filter = this.filterChange.value.toLowerCase();

        this.mailerService.searchMailers(pageRequest).subscribe(res => {
            if (res && res.data) {
              this.count = res.totalCount;
              this.resourceSelector.next(res.data);
            }
          }, error => this.errorMessage = <any>error);

      }, error => this.errorMessage = <any>error);

    this.dataSource = new TableDataSource(this.resourceSelector);
  }

  noCustomerFound() {
    const msg: DialogMessage = {
      title: 'No current data is available for a mailing job',
      message: 'Please carry out an import first, as there are no processed data for a mailing.',
      confirmText: '',
      export: false
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px', data: msg });
    dialogRef.afterClosed().subscribe(result => {});
  }

  checkSendMailStatus() {
  }

  execProcess() {
    const msg: DialogMessage = {
      title: 'Confirm start',
      message: 'Please confirm that you want to start the mailer job.',
      confirmText: 'Start',
      export: false
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px', data: msg });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {
        this.showMessage('Start aborted by user!');
      }
    });
  }

  showMessage (message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  startExportJob(_id: string): void {
    const msg: DialogMessage = {
      title: 'Confirm start',
      message: 'Please confirm that you want to start the export job?',
      confirmText: 'Start',
      export: true
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px', data: msg });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {
        this.showMessage('Start aborted by user!');
      }
    });
  }

  openDeleteDialog(_id: string): void {
    const msg: DialogMessage = {
      title: 'Delete mailing',
      message: 'The mailing will be deleted?',
      confirmText: 'Delete',
      export: false
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '320px', data: msg });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.showMessage('The entry deleted successfully.');
      } else {
        this.showMessage('Start aborted by user!');
      }
    });
  }
}

