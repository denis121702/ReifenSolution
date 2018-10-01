import {Component, OnInit} from '@angular/core';
import {PageRequest} from '../../models/common/page-request';
import {MailerService} from '../../services/mailer.service';
import {IMailer} from '../../models/mailer';
import {BarChartLabels, LineChartLabels, SplitChartLabels} from '../../constants/chart-labels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit  {

  dataView: IMailer;
  errorMessage: string;
  isDataAvailable = false;
  isDataAvailableChart = false;
  // lineChart ----------------------------------- //
  public lineChartData: Array<any> = [
    {data: [], label: LineChartLabels.NPS, lineTension: 0},
    {data: [], label: LineChartLabels.RESPONSE_RATE, lineTension: 0}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowValues: true,
    lineTension: 0,
    legend: {
      display: true,
      fullWidth: false,
      position: 'right',
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: -20,
          max: 100
        }
      }]
    }
  };
  public lineChartColorsTest: Array<any> = [
    { // blue
      backgroundColor: 'rgba(255,255,255, 0)',
      borderColor: 'rgba(0, 0, 255, 0.4)'
    },
    { // red
      backgroundColor: 'rgba(255,255,255, 0)',
      borderColor: 'rgba(255, 0, 0, 0.4)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // splitChart ---------------------------------- //
  public splitChartType = 'bar';
  public splitChartLegend = true;
  public splitChartOptions: any;
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
  // barChart ----------------------------------- //
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

  constructor(public mailerService: MailerService) {
  }

  ngOnInit() {
    this.loadChart();
    this.loadLastMailer();
  }

  loadLastMailer() {
    const pageRequest = new PageRequest();
    pageRequest.startIndex = 0;
    pageRequest.pageSize = 1;
    this.mailerService.searchMailers(pageRequest).subscribe(res => {
      if (res && res.data.length > 0) {
        this.dataView = res.data[0];
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
      }
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
      maintainAspectRatio: false,
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
      maintainAspectRatio: false,
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

  loadChart() {
    const pageRequest1 = new PageRequest();
    pageRequest1.startIndex = 0;
    pageRequest1.pageSize = 20;
    pageRequest1.sortDirection = 'asc';
    this.mailerService.searchMailers(pageRequest1).subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        const data = Object.assign([IMailer], res.data);
        const fehlgeschlagene = this.lineChartData.find(x => x.label === LineChartLabels.NPS);
        fehlgeschlagene.data = data.map(x => x.npsValue);
        const anzahlFeedback = this.lineChartData.find(x => x.label === LineChartLabels.RESPONSE_RATE);
        anzahlFeedback.data = data.map(x => x.responseRateValue);
        this.lineChartLabels = data.map(x => x.label);
        this.isDataAvailableChart = true;
      }
    }, error => this.errorMessage = <any>error);
  }
}
