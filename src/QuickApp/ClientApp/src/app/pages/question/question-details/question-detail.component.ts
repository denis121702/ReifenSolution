import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTabChangeEvent, MatSnackBar} from '@angular/material';

import {QuestionService} from '../../../services/question.service';
import {IQuestion} from '../../../models/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent implements OnInit {

  errorMessage: string;
  edit = false;
  id: string;
  dataView: IQuestion = {
    _id: '',
    timestamp: new Date,
    lastChange: new Date,
    title: '',
    description: '',
    status: '',
    rating: 10,
    sort: 0,
    isActive: true
  };
  oldData: any;
  infoView =  {
    numberOfVoters: 0,
    averageRating: 0,
    emailCount: 0
  };

  constructor(
    private route: ActivatedRoute,
    public questionService: QuestionService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
  }

  loadStyleMasterList(id: string) {
    this.questionService.getQuestion(id).subscribe((question: IQuestion) => {
        this.oldData = Object.assign({}, question);
        this.dataView = Object.assign({}, question);
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
    this.snackBar.open('Changes have been saved', 'Question',{ duration: 3000 });
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }
}
