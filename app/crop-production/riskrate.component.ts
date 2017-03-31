import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskRate } from './riskrate';
import { CropService } from './crop.service';
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'riskrate',
  templateUrl: './riskrate.component.html',
  styleUrls: ['./riskrate.component.css']
})
export class RiskRateComponent implements OnInit{
  crop : number = 1;
  disease: number = 1;
  disease_name: Observable<string>;
  riskrates: RiskRate[];
  riskratesSubscription: any;
  timerSubscription: any;
  Chart :any;

  // lineChart
  lineChartData :Array<any> ;
  lineChartLabels : Array<any>;

  lineChartOptions:any = {
        title: {
          fontColor: '#eeeeee',
          fontSize: 12,
          display: true,
        },
        scales: {
          xAxes: [{
            ticks:{
              fontColor: '#eeeeee',
              fontSize: 12,
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.1
            }
          }],
          yAxes: [{
            scaleLabel: {
              fontColor: '#eeeeee',
              fontSize: 12,
              display: true,
              labelString: 'Taux de risque'
            },
            ticks: {
              fontColor: '#eeeeee',
              fontSize: 12,
              beginAtZero: true,
              max: 100,
              min: 0,
              stepSize: 25
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.1
            }
          }]
        },
        /*annotation: {
          annotations: [{
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin:  50,
            yMax: 100,
            borderColor: 'rgba(255, 51, 51, 0.5)',
            borderWidth: 0,
            backgroundColor: 'rgba(255, 51, 51, 0.5)',
          }, {
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin:  50,
            yMax: 25,
            borderColor: 'rgba(255, 255, 0, 0.5)',
            borderWidth: 0,
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
          }, {
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin:  25,
            yMax: 0,
            borderColor: 'rgba(0, 204, 0, 0.5)',
            borderWidth: 0,
            backgroundColor: 'rgba(0, 204, 0, 0.5)',
          }],
        },*/
        responsive: true,
      };

  lineChartLegend:boolean = false;
  lineChartType:string = 'line';
  lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(128,159,177,0.2)',
      borderColor: 'rgba(128,159,177,1)',
      pointBackgroundColor: 'rgba(128,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(128,159,177,0.8)'
    }
  ];

  monthNames =  ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Aôut", "Septempbre", "Octobre", "Novembre", "Décembre"];

  constructor(private cropService : CropService,
              private router: Router){}

  ngOnInit(){
    let risk_rates : Observable<RiskRate[]>;

    risk_rates = this.cropService.getCurrentRiskRates(1);


    this.cropService.getDisease(this.disease).subscribe(response =>{
      this.disease_name = response.json()['disease_name'];
      this.lineChartOptions.title.text = response.json()['disease_name'];
      this.refreshData();
    });

  }
  private refreshData(): void {
      this.riskratesSubscription = this.cropService.getRiskRates(this.crop,this.disease).subscribe(riskrates => {
        this.riskrates = riskrates;
        this.generateChart();
      //  this.subscribeToData();
    });
  }
  private subscribeToData(): void {
      this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  public ngOnDestroy(): void {
      if (this.riskratesSubscription) {
          this.riskratesSubscription.unsubscribe();
      }
      if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
      }
  }
  public generateChart():void {

    let _lineChartLabels = Array(this.riskrates.length);
    let _lineChartData = Array(1);

    _lineChartData[0] = {
          data: new Array(this.riskrates.length),
          label: this.disease_name,
          fill: false,
      };
      for (let j = 0; j < this.riskrates.length; j++) {
          _lineChartData[0].data[j] = this.riskrates[j].risk_rate;
          let dt = new Date(this.riskrates[j].prediction_date);
          _lineChartLabels[j]=dt.getDay()+" "+this.monthNames[dt.getMonth()];
      }

    this.lineChartData = _lineChartData;
    this.lineChartLabels = _lineChartLabels;

  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
