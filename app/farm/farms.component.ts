import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farm } from './farm';
import { FarmService } from './farm.service';
import { Observable} from 'rxjs/Rx';


@Component({
  selector: 'farm-list',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css'],


})
export class FarmsComponent implements OnInit {


  farms: Farm[] = [];
  next: string; previous: string;
private farmsUrl = 'http://127.0.0.1:8000/api/farms/';  // URL to web api
  constructor(private farmService: FarmService) { }
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


                           }, //this.alerts = alerts, //Bind to view

                            err => {
                                // Log errors if any
                                console.log(err);
                            }
                          );
  }


  ngOnInit(): void {

    this.getFarms(this.farmsUrl);
  
  }

  getNextAlerts():void{
    if(this.next != null)
    this.getFarms(this.next);

  }

  getPreviousAlerts():void{
    if(this.previous != null)
    this.getFarms(this.previous);

  }
}
