import { Component, ViewChild, OnInit, Output,ElementRef,EventEmitter, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { RiskRate } from '../../models/riskrate';
import { CropService } from '../../services/crop.service';
import { RiskRateService } from '../../services/riskrate.service';
import { Observable} from 'rxjs/Rx';
import { CropProduction} from '../../models/crop-production'
import { CropitemComponent } from '../cropitem/cropitem.component'
declare var $: any;

@Component({
  selector: 'crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})

export class CropComponent implements OnInit{
  private risks: Array<Array<RiskRate>>;
  private weather : any;
  private crops: CropProduction[]=null;
  private loading: boolean=null;
  private maxItems : number;
  private index : number ;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cropService : CropService,
              private riskrateService : RiskRateService,
              private router: Router,
              private ngZone:NgZone){
    window.onresize = (e) =>
    {
        ngZone.run(() => {
          console.log(window.innerWidth);
          this.setParameters(window.innerWidth);
          this.slide();
        });
    };
  }

  getCropsByClient(): void {
      this.cropService.getCropProductionsByUser().subscribe(
           crops =>{
             this.crops=crops;
             this.getRiskRatesOfCrops();
           },
            err => {
              console.log("Error");
              //alert("server error dans crop component");
               this.router.navigate(['/login']);
            }
          );
  }
  
  ngOnInit(){
    this.setParameters(window.innerWidth);
    this.loading = true;
    this.getCropsByClient();
  }
  getRiskRatesOfCrops():void{
    this.risks= new Array(this.crops.length);
    this.riskrateService.getAllCurrentRiskRates().subscribe(res =>{
        this.risks = res.json();
        console.log(this.risks)
        this.slide()
        this.loading=false;
        this.notify.emit(this.risks);
    })
  }

  nextCrop():void{
    if(this.index<this.crops.length){
      this.index = this.index+1;
      this.slide()
    }
  }

  prevCrop():void{
    if(this.index>this.maxItems)  {
      this.index = this.index-1;
      this.slide()
    }
  }

  slide():void{
    var a = this.index ;
    var b = this.maxItems;
      $(".item").each(function( index ) {
          if($(".item").index(this)<a-1 && $(".item").index(this)>=a-b){
              $(this).show();
          }
          else{
              $(this).hide()                
          }
      });
    }

  setParameters(width:number):void{
      if(width<=640){
          this.maxItems = 1;
          this.index  = 1;
      }  
      if(width<=810){
          this.maxItems = 3;
          this.index  = 3;
      }  
      else if(width<=1100){
          this.maxItems = 4;
          this.index  = 4;
      }
      else if(width<=1300){
          this.maxItems = 5;
          this.index  = 5;
      }
      else {
          this.maxItems = 6;
          this.index  = 6;
      }
  }
}
