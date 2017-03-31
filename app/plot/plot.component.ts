import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farm } from '../farm/farm';
import { FarmService } from '../farm/farm.service';
import {PlotService} from './plot.service'
import {CropService} from '../crop-production/crop.service'
import { Plot} from './plot'
import {CropProduction} from '../crop-production/crop-production'
import { Observable} from 'rxjs/Rx';
import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral, LatLngBounds } from 'angular2-google-maps/core';

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    icon?: string;
    plot: string;
    crops: CropProduction[];
}

@Component({
  selector: 'plot-list',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],


})
export class PlotsComponent implements OnInit {
/*---------------- Variables--------------------*/
zoom: number = 15;
lat: number = 36.7525000;
lng: number =  3.0419700;
markers: marker[] = [];
farms: Farm[] = [];
plots: Plot[]=[];
crops: CropProduction[] =[];
next: string; previous: string;
private farmsUrl = 'http://127.0.0.1:8000/api/farms/';  // URL to web api



constructor(private farmService: FarmService ,
            private plotService: PlotService,
            private cropsService :CropService,) { }


  clickedMarker(label: string, index: number) {
       console.log(`clicked the marker: ${label || index}`)
   }


getFarms(url :string): void {
this.farmService.getFarms(url).subscribe(
                           farms =>{
                             this.farms=farms["results"];
                             this.next=farms["next"];
                             this.previous=farms["previous"];
                             if(!this.farms)
                             this.farms=farms;
                             this.getPlots(this.farms);

                           },  //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
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
  }

)
}
}


getCropsByPlot(plot):void {
this.cropsService.getCropProductionsByPlot(plot.plot_id).subscribe(
                           crops =>{
                             this.crops=crops["results"];
                             this.next=crops["next"];
                             this.previous=crops["previous"];
                             if(!this.crops)
                             this.crops=crops;

                             this.calculateMarker(this.crops,plot);

                           },  //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
                            }
                          );


  }
getCropsOfplots(plots ){
   //console.log("calcul");
for (let plot of plots){

 this.getCropsByPlot(plot);


}


}
  calculateMarker(crops,plot){

  var latCenter= (plot.latitude_n + plot.latitude_s)/2;
  var lngCenter= (plot.longitude_n+ plot.longitude_s)/2;
  this.markers.push( {
     lat: latCenter,
     lng: lngCenter,
     draggable: false,
     plot:plot.plot_name,
     crops :crops,
   });
 console.log("markers : ",this.markers);
  }
  ngOnInit(): void {
    this.getFarms(this.farmsUrl);

  }

/*  getNextAlerts():void{
    if(this.next != null)
    this.getFarms(this.next);

  }

  getPreviousAlerts():void{
    if(this.previous != null)
    this.getFarms(this.previous);

  }*/
}
