import { Component, OnInit,OnChanges,Output,Input, EventEmitter,SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Farm } from '../../models/farm';
import { FarmService } from '../../services/farm.service';
import {PlotService} from '../../services/plot.service'
import {CropService} from '../../services/crop.service'
import { Plot} from '../../models/plot'
import {CropProduction} from '../../models/crop-production'
import { Observable} from 'rxjs/Rx';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral, LatLngBounds } from 'angular2-google-maps/core';
import {RiskRate} from '../../models/riskrate';

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    icon?: string;
    plot: string;
    crops: CropProduction[];
    maxrisks?:RiskRate[];
}

@Component({
  selector: 'plot-list',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],


})
export class PlotsComponent implements OnInit , OnChanges{
/*---------------- Variables--------------------*/
  prediction: RiskRate;
  zoom: number = 7;
  lat: number = 35.7525000;
  lng: number =  3.0419700;
  markers: marker[] = [];
  farms: Farm[] = [];
  plots: Plot[]=[];
  crops: CropProduction[] =[];
  maxrisks: RiskRate[]= [];
  next: string; previous: string;
  private farmsUrl = 'http://127.0.0.1:8000/api/farms/';  // URL to web api
  @Output() notify: EventEmitter<CropProduction> = new EventEmitter<CropProduction>();
  @Input() risksOfCrops:Array<any>;

  constructor(private farmService: FarmService ,
            private plotService: PlotService,
            private cropsService :CropService,) { }

  clickedMarker(label: string, index: number) {
       console.log(`clicked the marker: ${label || index}`)
   }


getFarms(url :string): void {
    this.farmService.getFarms(url).subscribe(
       farms =>{

         this.farms=farms;
         this.getPlots(this.farms);

       },  //Bind to view
        err => {
            // Log errors if any
            console.log(err);
            alert("server error dans plot component");
        }
      );

  }
getPlots(farms){
    // pour chaque ferme on récupère ses parcelles
    for (let farm of this.farms){

    this.plotService.getPlotsByFarm(farm.farm_id).subscribe(
      p=>{
        this.plots=p;
        this.getCropsOfplots(this.plots);
      },
      err=>{
        alert("server error dans plot component");
      });
    }
}


getCropsByPlot(plot):void {
  this.cropsService.getCropProductionsByPlot(plot.plot_id).subscribe(
     crops =>{
                console.log("==> plot :",plot);
                console.log("==> crops :",crops);
                this.calculateMarker(crops,plot);
     },  //Bind to view
      err => {
          // Log errors if any
          console.log(err);
          alert("server error dans plot component");
      }
    );

  }
  getCropsOfplots(plots ){
      for (let plot of plots){
          this.getCropsByPlot(plot);
      }
  }

getIcon(maxriskOfPlot:RiskRate):string{
  if(maxriskOfPlot){
     if(maxriskOfPlot.risk_rate>0.50)
        return "./src/assets/red.png" // high risk
    if(maxriskOfPlot.risk_rate>0.25)
        return "./src/assets/orange.png" // average
  }
  return "./src/assets/green.png"// low risk
}
  calculateMarker(crops,plot){

  // appeler la fonction qui donne max risk of this plot
  let risksOfCrops : RiskRate[] = this.getrisksOfCrops(crops); 
  // appeler la fonction qui donne max risks of all crops of this plot
  let maxriskOfPlot : RiskRate = this.getMaxRisk(risksOfCrops);
  //if(risksOfCrops && maxriskOfPlot){
        this.prediction = maxriskOfPlot;
        console.log('risks', risksOfCrops);
       
        this.markers.push( {
           lat: plot.latitude,
           lng: plot.longitude,
           draggable: false,
           plot:plot.plot_name,
           icon:this.getIcon(maxriskOfPlot),
           crops :crops,
           maxrisks:risksOfCrops
         }); 
        console.log("markers : ",this.markers);
  //}
  
  }
  
  getMaxRisk(risks:RiskRate[]):RiskRate{
    if(risks.length<1) {
      console.log("risk rates is empty in getMaxRisk");
      return null;
    }
    let _max:number = risks[0].risk_rate;
    let prediction:RiskRate=risks[0];
    for (let risk of risks){
        if(risk.risk_rate>_max){
          _max=risk.risk_rate;
          prediction=risk;
        }
    }
    return prediction;

  }
  getrisksOfCrops(crops:CropProduction[]):RiskRate[]{
    let risks : RiskRate[]=[];

    console.log("==>this.risksOfCrops",this.risksOfCrops);
   
      for(let index=0;index<this.risksOfCrops.length;index++){
          let croprisks=this.risksOfCrops[index];
        if(  croprisks && 
            croprisks.length>0 && 
            croprisks[0] &&
            this.cropInList(croprisks[0].crop_production,crops))
            {
              console.log("iterate in crop in list");
              let _max =croprisks[0].risk_rate;
              let prediction :RiskRate= croprisks[0];
              for(let risk of croprisks){
                  if(risk.risk_rate>_max){
                    _max=risk.risk_rate;
                    prediction=risk;
                  }
              }
              risks.push(prediction)
        }
      
    }
    return risks
  }
  cropInList(crop_id:number, crops:CropProduction[]):boolean{
    for(let crop of crops){
      if(crop.crop_production_id==crop_id){
        return true;
      }
    }
    return false;
  }

  
  ngOnInit(): void {
    //this.getFarms(this.farmsUrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["risksOfCrops"].currentValue)
      {
        if(changes["risksOfCrops"].currentValue.length>0){
            console.log("risksOfCrops has been changed");
            this.getFarms(this.farmsUrl);
        }
      }
    
  }  
  loadChart(crop:CropProduction){
    console.log('nom de la parcelle',crop.name);
    this.notify.emit(crop);
  }
  getClass(arr:any, j):string{
       if(arr && arr[j] && arr[j].risk_rate>0.5) return  "red";
       if(arr && arr[j] && arr[j].risk_rate>=0.25) return  "orange";
       return "green"
  }

}
