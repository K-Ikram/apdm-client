import { Component, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnomalyService } from '../../services/anomaly.service';
import { DiseaseService} from '../../services/disease.service'
import { CropService} from '../../services/crop.service';
import { Anomaly } from '../../models/Anomaly';
import { CropProduction} from '../../models/crop-production';
import { Disease} from '../../models/disease'
import { Response} from '@angular/http';
import { MenuComponent} from '../menu/menu.component'

@Component({
  selector: 'add-anomaly',
  templateUrl: './add-anomaly.component.html',
  styleUrls: ['./add-anomaly.component.css']
})


export class AddAnomalyComponent implements OnInit {

crops: CropProduction[] = [];
diseases: Disease[]=[];
anomaly : Anomaly;
 @Input() crop_production : number;
 @Input() occurence_date :string;
 @Input() disease : number;
  constructor(private anomalyService: AnomalyService, 
              private cropService : CropService, 
              private diseaseService :DiseaseService,
              private router: Router) {

  this.occurence_date = new Date().toISOString().slice(0, 16);}
  submitted = false;

  ngOnInit(): void {

    this.cropService.getCropProductionsByUser().subscribe(
         crops =>{
           this.crops=crops;
           console.log(this.crops);
         },
          err => {
              console.log(err);
              //alert("server error dans add anomaly component");
               this.router.navigate(['/login']);
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
              alert("server error dans add anomaly component");
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
