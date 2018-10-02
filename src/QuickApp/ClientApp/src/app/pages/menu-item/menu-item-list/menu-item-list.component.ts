import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/rx';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {PageRequest} from '../../../models/common/page-request';
import {TableDataSource} from '../../../services/tableDataSource';
import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {DialogMessage} from '../../../shared/dialogs/confirm-dialog/dialog-message';
import {MenuItemService} from '../../../services/menu-item.service';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss']
})

export class MenuItemListComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: TableDataSource | null;
  displayedColumns = [
    'actions',
    'name',
    'timestamp',
    'category',
    'icon',
    'sort'
  ];
  count = 0;
  errorMessage: string;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filterChange = new BehaviorSubject('');

  constructor(public menuItemService: MenuItemService,
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

        this.menuItemService.searchMenuItems(pageRequest).subscribe(res => {
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
      title: 'Delete menu item',
      message: 'The menu item will be deleted?',
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

