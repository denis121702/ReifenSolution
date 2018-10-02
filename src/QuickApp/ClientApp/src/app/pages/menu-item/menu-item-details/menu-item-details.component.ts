import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MenuItemService} from '../../../services/menu-item.service';
import {IMenuItem} from '../../../models/menu-item';
import {RoleService} from '../../../services/role.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PageRequest} from '../../../models/common/page-request';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.scss']
})

export class MenuItemDetailsComponent implements OnInit {

  roles$: BehaviorSubject<any[]>;
  categories$: BehaviorSubject<any[]>;
  errorMessage: string;
  edit = false;
  oldData: any;
  id: string;
  dataView: IMenuItem = {
    _id: '',
    timestamp: new Date,
    name: '',
    category: '',
    icon: '',
    route: '',
    sort: 0,
    roles: []
  };

  constructor(private route: ActivatedRoute,
              public roleService: RoleService,
              public menuItemService: MenuItemService,
              public snackBar: MatSnackBar) {
    this.roles$ = <BehaviorSubject<any[]>> new BehaviorSubject(new Array<any>());
    this.categories$ = <BehaviorSubject<any[]>> new BehaviorSubject(new Array<any>());
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
    this.loadRolesList();
    // this.loadCategoryList();
  }

  loadRolesList() {
    this.roleService.searchRoles(new PageRequest()).subscribe(res => {
      if (res && res.data) {
        this.roles$.next(res.data);
      }
    }, error => this.errorMessage = <any>error);
  }

  /*loadCategoryList() {
    this.menuItemService.findCategory().subscribe((res: any) => {
      if (res) {
        this.categories$.next(res);
      }
    }, error => this.errorMessage = <any>error);
  }*/

  loadStyleMasterList(id: string) {
    this.menuItemService.getMenuItemById(id).subscribe((menuItem: IMenuItem) => {
          this.oldData = Object.assign({}, menuItem);
          this.dataView = Object.assign({}, menuItem);
      }, error => this.errorMessage = <any>error
      );
  }

  saveEntry() {
    this.onSaveComplete();
    this.edit = false;
  }

  onSaveComplete(): void {
    this.edit = false;
    this.snackBar.open('Changes have been saved ', 'MenuItem',{ duration: 3000 });
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }
}
