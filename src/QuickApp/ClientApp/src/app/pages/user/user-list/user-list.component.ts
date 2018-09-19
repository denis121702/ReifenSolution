import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/rx';

import {MatPaginator, MatSort} from '@angular/material';
import {PageRequest} from '../../../models/common/page-request';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TableDataSource} from '../../../services/tableDataSource';
import {Utilities} from '../../../services/utilities';
import {AccountService} from '../../../services/account.service';
import {AlertService, MessageSeverity} from '../../../services/alert.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit  {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: TableDataSource | null;
  displayedColumns = ['id', 'userName', 'fullName', 'email'];
  count = 0;
  errorMessage: string;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filterChange = new BehaviorSubject('');

  constructor(private accountService: AccountService, private alertService: AlertService) {
  }

  onDataLoadFailed(error: any) {
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`, MessageSeverity.error, error);
  }

  ngOnInit() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(450)
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

          this.accountService.getUsers().subscribe(users => {
            if (users) {
              this.count = users.length;
              this.resourceSelector.next(users as any);
            }
          }, error => this.onDataLoadFailed(error));

    }, error => this.errorMessage = <any>error);

    this.dataSource = new TableDataSource(this.resourceSelector);
  }

}


