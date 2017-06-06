import { Component, OnInit , Output,Input,EventEmitter, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '../../models/alert';
import { AlertService } from '../../services/alert.service';
import {  Response} from '@angular/http';


@Component({
  selector: 'alerts',
  moduleId: module.id,
  templateUrl: './alerts.component.html',
  styleUrls: ['./alert.component.css']
})


export class AlertsComponent implements OnInit {
  page =1;
  noNex = false;
  noPrec= true;
  alerts: Array<Alert>;
  next:string; 
  previous: string;
  feedback_type:string;
  confirmed="confirmed";
  denied="denied";
  pages:Array<any>;
  private alertsUrl = 'http://127.0.0.1:8000/api/alertsbyclient/?page=';  // URL to web api
  @Input() notifAlert : Alert;
  @Output() notify: EventEmitter<Alert> = new EventEmitter<Alert>();

  constructor(private alertService: AlertService,
              private router: Router) { }
  
  getAlerts(page): void {
    console.log("page",page);
    this.alertService.getAlerts(this.alertsUrl+page).subscribe(
       alerts =>{
               this.alerts=alerts["results"];
               this.next = alerts["next"];
               this.previous=alerts["previous"];               
               if(!this.next) //griser 
                 this.noNex = true;
               else
                 this.noNex = false;

               if(!this.previous)//griser
                   this.noPrec = true;
               else
                    this.noPrec = false;
               console.log(this.alerts);             
       },
        err => {
            // Log errors if any
            console.log(err);
            //alert("erreur serveur dans alert component")
             this.router.navigate(['/login']);
        }
      );
  }
  ngOnInit(): void {
    try{
      this.getAlerts(this.page);
    }
    catch (err){
      this.router.navigate(['/login']);
    }
  }
  confirm(alert : Alert): void {
     let date = new Date().toISOString();
     alert.feedback_date = date;
     alert.feedback_type="confirmed";
     var currentUser = JSON.parse(localStorage.getItem('username'));
     alert.client = currentUser && currentUser.username;
     this.alertService.confirmAlert(alert);
     this.notify.emit(alert);
  }

  decline(alert : Alert): void {
    let date = new Date().toISOString();
     alert.feedback_date = date;
     alert.feedback_type="denied";
     var currentUser = JSON.parse(localStorage.getItem('username'));
     alert.client = currentUser && currentUser.username;
     this.alertService.declineAlert(alert);
     this.notify.emit(alert);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["notifAlert"].currentValue)
      {   
          console.log(this.notifAlert);
          console.log("an alert has been treated");
          let changed:boolean = false;
          var _alerts :Alert[] = [];
          for(let alert of this.alerts){
              if(alert.alert_id==this.notifAlert.alert_id){
                _alerts.push(this.notifAlert);
                changed=true;
                 console.log("my alert has been treated");
              }
              else{
                _alerts.push(alert)
              }
          }
          if(changed){
            this.alerts = _alerts;
          }
      }
    
  }  


  getNextAlerts():void{
    this.getAlerts(this.next);
  }

  getPreviousAlerts():void{
      this.getAlerts(this.previous);
  }

  getCropIcon(id:string):string{
      return './src/assets/'+id+'.png';
  }

  getDate(date:string):string{
    let dt = new Date(date);
    return 'le ' + (dt.getDay()+1)+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()+' à '+dt.getHours()+':'+dt.getMinutes();
  }

}
