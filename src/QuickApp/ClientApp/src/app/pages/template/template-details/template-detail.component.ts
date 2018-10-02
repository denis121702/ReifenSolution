import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TemplateService} from '../../../services/template.service';
import {ITemplate} from '../../../models/template';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})

export class TemplateDetailComponent implements OnInit {

  errorMessage: string;
  edit = false;
  id: string;
  oldData: any;
  dataView: ITemplate = {
    _id: '',
    timestamp: new Date,
    subject: '',
    text: '',
    html: '',
    isActive: true
  };

  constructor(private route: ActivatedRoute,
              public templateService: TemplateService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
  }

  loadStyleMasterList(id: string) {
    this.templateService.getTemplate(id).subscribe((question: ITemplate) => {
        this.oldData = Object.assign({}, question);
        this.dataView = Object.assign({}, question);
      },error => this.errorMessage = <any>error
    );
  }

  saveEntry() {
    this.onSaveComplete();
    this.edit = false;
  }

  onSaveComplete(): void {
    this.edit = false;
    this.snackBar.open('Changes have been saved ', 'Email template',{ duration: 2000 });
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }
}
