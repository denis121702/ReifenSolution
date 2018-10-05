import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PageRequest} from '../../../models/common/page-request';
import {TableDataSource} from '../../../services/tableDataSource';
import {RoleService} from '../../../services/role.service';
import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {DialogMessage} from '../../../shared/dialogs/confirm-dialog/dialog-message';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})

export class RoleListComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: TableDataSource | null;
  displayedColumns = [
    'actions',
    'name',
    'timestamp',
    'description'
  ];
  count = 0;
  errorMessage: string;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filterChange = new BehaviorSubject('');

  constructor(public roleService: RoleService,
              public dialog: MatDialog,
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

          this.roleService.searchRoles(pageRequest).subscribe(res => {
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
      title: 'Delete Role',
      message: 'the role will be deleted?',
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
}

