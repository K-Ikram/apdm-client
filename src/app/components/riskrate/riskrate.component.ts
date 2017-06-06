import { Component, OnInit , Input, SimpleChange} from '@angular/core';
import { Router } from '@angular/router';
import { RiskRate } from '../../models/riskrate';
import { Disease } from '../../models/disease';
import { CropProduction } from '../../models/crop-production';
import { DiseaseService } from '../../services/disease.service';
import { RiskRateService } from '../../services/riskrate.service';
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'riskrate',
  templateUrl: './riskrate.component.html',
  styleUrls: ['./riskrate.component.css']
})
export class RiskRateComponent implements OnInit{
  crop : number = 1;
  @Input() _crop : CropProduction;
  diseases: Disease[];

  riskratesSubscription: any;
  timerSubscription: any;

  // chart
  chartData :Array<any> ;
  chartLabels : Array<any>;
  chartRisks : Array<any>
  chartOptions:any = {
        title: {
          fontColor: '#797979',
          fontSize: 12,
          display: true,
        },
        scales: {
          xAxes: [{
            ticks:{
              fontColor: '#797979',
              fontSize: 12,
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.1
            }
          }],
          yAxes: [{
            scaleLabel: {
              fontColor: '#797979',
              fontSize: 12,
              display: true,
              labelString: 'Taux de risque'
            },
            ticks: {
              fontColor: '#797979',
              fontSize: 12,
              beginAtZero: true,
              max: 1,
              min: 0,
              stepSize: 0.25
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      };
  chartLegend:boolean = false;
  chartType:string = 'line';
  chartColors:Array<any> = [
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
  index : number=0;
  
  constructor(private riskRateService : RiskRateService,
              private diseaseService : DiseaseService,
              private router: Router){}

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    console.log('Change detected:', changes["_crop"].currentValue);
    this._crop = changes["_crop"].currentValue;
    this.diseaseService.getDiseasesByCrop(this._crop.crop_production_id).subscribe(
      (diseases=> {
        this.diseases = diseases;
        this.chartLabels= new Array(diseases.length);
        this.chartData = new Array(diseases.length);
        this.chartRisks = new Array(diseases.length);
        this.refreshData();
      }));  
  }

  ngOnInit(){
  }

  private refreshData(): void {
    for(let index in this.diseases){

      this.riskratesSubscription = 
        this.riskRateService
        .getRiskRates(this._crop.crop_production_id,this.diseases[index].disease_id)
        .subscribe(
            (riskrates) => {
              this.chartRisks[index] = riskrates.reverse();
              this.generateChart(index);
            },
            (err)=> alert('an error has produced'));
    }         
  }

  public ngOnDestroy(): void {
      if (this.riskratesSubscription) {
          this.riskratesSubscription.unsubscribe();
      }
      if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
      }
  }
  public generateChart(index:any):void {

    let _chartLabels = Array(this.chartRisks[index].length);
    let _chartData = Array(1);
    _chartData[0] = {
          data: new Array(this.chartRisks[index].length),
          label: this.diseases[index].disease_name,
          fill: false,
      };
      let k = this.chartRisks[index].length;
      for (let j = 0; j < k; j++) {
          _chartData[0].data[j] = this.chartRisks[index][k-j-1].risk_rate;
          let dt = new Date(this.chartRisks[index][k-j-1].prediction_date);
          _chartLabels[j]=dt.getDay()+" "+this.monthNames[dt.getMonth()];
      }
    this.chartData[index] = _chartData;
    this.chartLabels[index] = _chartLabels;    
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  getDiseaseImage(id:number):string{
    return './src/assets/disease'+id+'.jpg';
  }
}
