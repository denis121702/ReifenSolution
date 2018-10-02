import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RoleService} from '../../../services/role.service';
import {IRole} from '../../../models/role';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})

export class RoleDetailsComponent implements OnInit {

  errorMessage: string;
  edit = false;
  oldData: any;
  id: string;
  dataView: IRole = {
      _id: '',
      name: '',
      description: '',
      timestamp: new Date
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              public roleService: RoleService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
  }

  loadStyleMasterList(id: string) {
    this.roleService.getRoleById(id)
      .subscribe(
        (role: IRole) => {
            this.oldData = Object.assign({}, role);
            this.dataView = Object.assign({}, role);
        },
        error => this.errorMessage = <any>error
      );
  }

  saveEntry() {
    this.onSaveComplete();
    this.edit = false;
  }

  onSaveComplete(): void {
    this.edit = false;
    this.snackBar.open('Changes have been saved ', 'Role',{ duration: 2000 });
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }
}
