import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {TableDataSource} from '../../../services/tableDataSource';
import {PageRequest} from '../../../models/common/page-request';
import {TemplateService} from '../../../services/template.service';
import {DialogMessage} from '../../../shared/dialogs/confirm-dialog/dialog-message';
import {ConfirmDialogComponent} from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})

export class TemplateListComponent implements OnInit {

  displayedColumns = [
    'timestamp',
    'subject',
    // 'language',
    // 'isActive',
    // 'actions'
  ];

  dataSource: TableDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  errorMessage: string;
  count = 0;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filterChange = new BehaviorSubject('');

  constructor(public templateService: TemplateService,
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
      this.sort.sortChange).subscribe(result => {
        const pageRequest = new PageRequest();
        pageRequest.startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        pageRequest.pageSize = this.paginator.pageSize;
        pageRequest.sortActive = this.sort.active;
        pageRequest.sortDirection = this.sort.direction;
        pageRequest.filter = this.filterChange.value.toLowerCase();

        this.templateService.searchTemplates(pageRequest).subscribe(res => {
          if (res && res.data) {
            this.count = res.totalCount;
            this.resourceSelector.next(res.data as any);
          }
        }, error => this.errorMessage = <any>error);
      },
      error => this.errorMessage = <any>error);

    this.dataSource = new TableDataSource(this.resourceSelector);
  }

  load() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  openDeleteDialog(_id: string): void {
    const msg: DialogMessage = {
      title: 'Delete e-mail template',
      message: 'The e-mail template will be deleted?',
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
