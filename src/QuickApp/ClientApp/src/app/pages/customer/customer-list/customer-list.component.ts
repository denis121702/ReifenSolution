import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Observable} from 'rxjs/rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {TableDataSource} from '../../../services/tableDataSource';
import {CustomerService} from '../../../services/customer.service';
import {PageRequest} from '../../../models/common/page-request';
import {DialogMessage} from '../../../shared/dialogs/confirm-dialog/dialog-message';
import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {AuthGuard} from '../../../services/auth-guard.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

  displayedColumns = [
    'actions',
    'customerId',
    'contactId',
    'firmenname',
    'anrede',
    'vorname',
    'nachname',
    'email',
    'sendMailStatus'
  ];

  dataSource: TableDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  errorMessage: string;
  count = 0;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filterChange = new BehaviorSubject('');

  constructor(public customerService: CustomerService,
              public dialog: MatDialog,
              public authGuard: AuthGuard,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filterChange.next(this.filter.nativeElement.value);
      });

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

      this.customerService.searchCustomers(pageRequest).subscribe(res => {
        if (res && res.data) {
          this.count = res.totalCount;
          this.resourceSelector.next(res.data as any);
        }
      }, error => this.errorMessage = <any>error);

    }, error => this.errorMessage = <any>error);

    this.dataSource = new TableDataSource(this.resourceSelector);
  }

  openDeleteDialog(_id: string): void {
    const msg: DialogMessage = {
      title: 'Delete customer',
      message: 'The customer will be deleted?',
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

  showMessage (message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  onTabChange(event) {
    console.log('tab changed', event);
  }

  onPage(event) {}
  onSort(event) {}
  load() {}
  search() {}
  resetSearch() {}
}


