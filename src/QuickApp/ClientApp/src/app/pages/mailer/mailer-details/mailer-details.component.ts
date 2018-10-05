import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {IMailer} from '../../../models/mailer';
import {MailerService} from '../../../services/mailer.service';
import {BarChartLabels, SplitChartLabels} from '../../../constants/chart-labels';
import {MatSnackBar, MatPaginator, MatSort} from '@angular/material';
import {TableDataSource} from '../../../services/tableDataSource';
import {PageRequest} from '../../../models/common/page-request';

@Component({
  selector: 'app-mailer-details',
  templateUrl: './mailer-details.component.html',
  styleUrls: ['./mailer-details.component.scss']
})

export class MailerDetailsComponent implements OnInit {

  displayedColumns = [
    'customerId',
    'contactId',
    'isMainQuestionAnswered',
    'firmenname',
    'anrede',
    'vorname',
    'nachname',
    'email'
  ];
  dataSource: TableDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  filterChange = new BehaviorSubject('');
  count = 0;
  resourceSelector: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  errorMessage: string;
  edit = false;
  id: string;
  oldData: IMailer;
  dataView: IMailer = {
      _id: '',
      timestamp: new Date,
      successCustomersCount: 0,
      failureCustomersCount: 0,
      questionsCount: 0,
      votesCount: 0,
      tokenExpiresDays: 0,
      status: '',
      promoterCount: 0,
      detractorCount: 0,
      npsValue: 0,
      responseRateValue: 0,
      label: ''
  };

  isDataAvailable = false;

  public splitChartOptions: any;
  public barChartOptions: any;
  public barChartLabels: string[] = ['Mailing'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {data: [], label: BarChartLabels.NUMBER_EMAILS},
    {data: [], label: BarChartLabels.NUMBER_FEEDBACK},
    {data: [], label: BarChartLabels.FAILED_EMAILS}
  ];
  public barChartColors: Array<any> = [
    { // blue
      backgroundColor: 'rgba(0, 0, 255, 0.4)',
    },
    { // green
      backgroundColor: 'rgba(0, 255, 0, 0.4)',
    },
    { // red
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
    },
  ];

  public splitChartLabels: string[] = ['Mailing'];
  public splitChartData: any[] = [
    {data: [], label: SplitChartLabels.PROMOTERS},
    {data: [], label: SplitChartLabels.PASSIVES},
    {data: [], label: SplitChartLabels.DETRACTORS}
  ];
  public splitChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(0, 255, 0, 0.4)',
    },
    { // blue
      backgroundColor: 'rgba(0, 0, 255, 0.4)',
    },
    { // red
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
    },
  ];

  constructor(private route: ActivatedRoute,
              public mailerService: MailerService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadStyleMasterList(this.id);
    this.loadCustomerList(this.id);
  }

  loadCustomerList(id: string) {
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
        pageRequest.id = id;
        pageRequest.startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        pageRequest.pageSize = this.paginator.pageSize;
        pageRequest.sortActive = this.sort.active;
        pageRequest.sortDirection = this.sort.direction;
        pageRequest.filter = this.filterChange.value.toLowerCase();
        this.mailerService.getCustomersByMailerId(pageRequest).subscribe(res => {
          if (res && res.data) {
            this.count = res.totalCount;
            this.resourceSelector.next(res.data as any);
          }
        }, error => this.errorMessage = <any>error);

    }, error => this.errorMessage = <any>error);

    this.dataSource = new TableDataSource(this.resourceSelector);
  }

  loadStyleMasterList(id: string) {
    this.mailerService.getMailerById(id).subscribe((mailer: IMailer) => {
      this.dataView = Object.assign({}, mailer);
      this.oldData = Object.assign({}, mailer);
      const fehlgeschlagene = this.barChartData.find(x => x.label === BarChartLabels.FAILED_EMAILS);
      fehlgeschlagene.data.push(this.dataView.failureCustomersCount);
      const anzahlFeedback = this.barChartData.find(x => x.label === BarChartLabels.NUMBER_FEEDBACK);
      anzahlFeedback.data.push(this.dataView.votesCount);
      const anzahlMails = this.barChartData.find(x => x.label === BarChartLabels.NUMBER_EMAILS);
      anzahlMails.data.push(this.dataView.successCustomersCount);
      this.setBarChartOption(this.dataView.successCustomersCount);
      // split canvas
      const promoters = this.splitChartData.find(x => x.label === SplitChartLabels.PROMOTERS);
      promoters.data.push(this.dataView.promoterCount);
      const passives = this.splitChartData.find(x => x.label === SplitChartLabels.PASSIVES);
      passives.data.push(this.dataView.votesCount - (this.dataView.detractorCount + this.dataView.promoterCount));
      const detractors = this.splitChartData.find(x => x.label === SplitChartLabels.DETRACTORS);
      detractors.data.push(this.dataView.detractorCount);
      this.isDataAvailable = true;
      this.setOption(this.dataView.votesCount);
    }, error => this.errorMessage = <any>error);
  }

  setBarChartOption(count: number) {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      scaleShowValues: true,
      scaleValuePaddingX: 10,
      scaleValuePaddingY: 10,
      animation: {
        duration: 10,
        onComplete: function () {
          const chartInstance = this.chart, ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.controller.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (bar, index) {
                let data = dataset.data[index];
                if (dataset.label === BarChartLabels.NUMBER_FEEDBACK) {
                  const value = data !== 0 ? Math.floor((data / count) * 100) : 0;
                  data = data + ' - ' + value + '%';
                } else if (dataset.label === BarChartLabels.NUMBER_EMAILS) {
                  data = data + ' - 100%';
                }
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            }
          });
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: count > 20 ? count * 2 : 20
          }
        }]
      }
    };
  }

  setOption(count: number) {
    this.splitChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scaleShowValues: true,
      scaleValuePaddingX: 10,
      scaleValuePaddingY: 10,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        duration: 10,
        onComplete: function () {
          const chartInstance = this.chart, ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.controller.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                const value = count !== 0 ? Math.floor((data / count) * 100) : 0;
                ctx.fillText(value + '% - ' + data + ' Customer', bar._model.x, bar._model.y - 5);
              });
            }
          });
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: count > 20 ? count * 2 : 20
          }
        }]
      }
    };
  }

  editEntry() {
    this.edit = true;
  }

  cancelEntry() {
    this.dataView = Object.assign({}, this.oldData);
    this.edit = false;
  }

  saveEntry() {
    this.onSaveComplete();
    this.edit = false;
  }

  onSaveComplete(): void {
    this.edit = false;
    this.snackBar.open('Changes have been saved', 'Mailer', {duration: 3000});
  }
}
