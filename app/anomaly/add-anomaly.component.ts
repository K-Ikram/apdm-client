import { Component, Input,OnInit } from '@angular/core';


import { Anomaly } from './Anomaly';

import { AnomalyService } from './anomaly.service';
import {DiseaseService} from '../disease/disease.service'
import {CropService} from '../crop-production/crop.service';
import {CropProduction} from '../crop-production/crop-production';
import {Disease} from '../disease/disease'
import {  Response} from '@angular/http';


@Component({
  selector: 'add-anomaly',
  moduleId: module.id,
  templateUrl: './add-anomaly.component.html',
  //styleUrls: ['./alert.component.css']
})


export class AddAnomalyComponent implements OnInit {

crops: CropProduction[] = [];
diseases: Disease[]=[];
anomaly : Anomaly;
 @Input() crop_production : number;
 @Input() occurence_date :string;
 @Input() disease : number;
  constructor(private anomalyService: AnomalyService, private cropService : CropService, private diseaseService :DiseaseService) {
  this.occurence_date = new Date().toISOString().slice(0, 16);}
  submitted = false;


  ngOnInit(): void {


    this.cropService.getCropProductionsByUser('http://127.0.0.1:8000/api/crop/client/').subscribe(
         crops =>{
           this.crops=crops;
           console.log(this.crops);
         },
          err => {
              console.log(err);
          }
        );

  }

  loadDiseases(id){

    this.diseaseService.getDiseasesByCrop(id).subscribe(
         diseases =>{
           this.diseases=diseases;
           console.log(this.diseases);
         },
          err => {
              console.log(err);
          }
        );

  }

addAnomaly(){

this.anomaly=new Anomaly();

 this.anomaly.occurence_date =this.occurence_date;
 this.anomaly.disease= this.disease;
 this.anomaly.crop_production=this.crop_production;
 this.anomalyService.addAnomaly(this.anomaly);
this.submitted = true;
}

}
