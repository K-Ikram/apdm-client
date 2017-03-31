import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Alert } from './alert';

import { AlertService } from './alert.service';
import {  Response} from '@angular/http';


@Component({
  selector: 'alerts',
  moduleId: module.id,
  templateUrl: './alerts.component.html',
styleUrls: ['./alert.component.css']
})


export class AlertsComponent implements OnInit {

  alerts: Alert[] = [];
  next: string; previous: string;
  private alertsUrl = 'http://127.0.0.1:8000/api/alerts/';  // URL to web api
  constructor(private alertService: AlertService,
              private router: Router) { }
  
  getAlerts(url :string): void {
  this.alertService.getAlerts(url).subscribe(
       alerts =>{
         this.alerts=alerts["results"];
         this.next=alerts["next"];
         this.previous=alerts["previous"]
         console.log(this.next);

       },
        err => {
            // Log errors if any
            console.log(err);
        }
      );
  }
  ngOnInit(): void {
    try{
      this.getAlerts(this.alertsUrl);
    }
    catch (err){
      this.router.navigate(['/login']);
    }
  }
  confirm(alert : Alert): void {
    this.alertService.confirmAlert(alert);
  }
  getNextAlerts():void{
    if(this.next != null)
    this.getAlerts(this.next);

  }

  getPreviousAlerts():void{
    if(this.previous != null)
    this.getAlerts(this.previous);

  }

}
