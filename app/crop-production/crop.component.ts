import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiskRate } from './riskrate';
import { CropService } from './crop.service';
import { Observable} from 'rxjs/Rx';
import {CropProduction} from './crop-production'

@Component({
  selector: 'crop',
  templateUrl: './crop.component.html'
})
export class CropComponent implements OnInit{
  risks: RiskRate[];
  crop: string = "Blé";
  weather : any;
  crops: CropProduction[] = [];
  next: string; previous: string;
  private cropsUrl = 'http://127.0.0.1:8000/api/crop/client/';  // URL to web api


  constructor(private cropService : CropService,
              private router: Router){}
              getCropsByClient(url :string): void {
                  this.cropService.getCropProductionsByUser(url).subscribe(
                       crops =>{
                         this.crops=crops["results"];
                         this.next=crops["next"];
                         this.previous=crops["previous"]
                         if(!this.crops)
                         this.crops=crops;
                         console.log(this.crops);

                       },

                        err => {

                            console.log(err);
                        }
                      );
              }

  ngOnInit(){
    this.getCropsByClient(this.cropsUrl);
  	this.cropService.getCurrentWeather(1,12).subscribe(response=>{
  		console.log(response.json());
  	});
      this.cropService.getCurrentRiskRates(1).subscribe(response => {
      this.risks = response;
      });
  }
  getNextCrops():void{
  if(this.next != null)
  this.getCropsByClient(this.next);

}

getPreviousCrops():void{
  if(this.previous != null)
  this.getCropsByClient(this.previous);

}

}
