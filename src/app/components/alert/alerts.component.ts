import { Component, OnInit , Output,Input,EventEmitter, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '../../models/alert';
import { AlertService } from '../../services/alert.service';
import {  Response} from '@angular/http';
declare var $: any;

@Component({
  selector: 'alerts',
  moduleId: module.id,
  templateUrl: './alerts.component.html',
  styleUrls: ['./alert.component.css']
})


export class AlertsComponent implements OnInit {
  private page =1;
  private noNex = false;
  private noPrec= true;
  private alerts: Array<Alert>;
  private next:string; 
  private previous: string;
  private alertOkay: Alert;
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
     var currentUser = JSON.parse(localStorage.getItem('username'));
     this.alertOkay = new Alert();
     this.alertOkay.alert_id =alert.alert_id;
     this.alertOkay.alert_date = alert.alert_date;
     this.alertOkay.crop_production = alert.crop_production;
     this.alertOkay.disease = alert.disease;
     this.alertOkay.risk_rate = alert.risk_rate;
     this.alertOkay.feedback_date = date;
     this.alertOkay.feedback_type="confirmed";
     this.alertOkay.client = currentUser && currentUser.username;
     $("#confirmModal").modal('show');
  }

  decline(alert : Alert): void {
     let date = new Date().toISOString();
     var currentUser = JSON.parse(localStorage.getItem('username'));
     this.alertOkay = new Alert();
     this.alertOkay.alert_id =alert.alert_id;
     this.alertOkay.alert_date = alert.alert_date;
     this.alertOkay.crop_production = alert.crop_production;
     this.alertOkay.disease = alert.disease;
     this.alertOkay.risk_rate = alert.risk_rate;
     this.alertOkay.feedback_date = date;
     this.alertOkay.feedback_type="denied";
     this.alertOkay.client = currentUser && currentUser.username;
     $("#confirmModal").modal('show');
  }

  validate():void{
    if(this.alertOkay.feedback_type && this.alertOkay.feedback_type==="confirmed"){
      this.alertService.confirmAlert(this.alertOkay);        
    }
    else if(this.alertOkay.feedback_type && this.alertOkay.feedback_type==="denied"){
      this.alertService.declineAlert(this.alertOkay);        
    }
    else return;
    var _alerts :Alert[] = [];
    for(let alert of this.alerts){
        if(alert.alert_id==this.alertOkay.alert_id){
          _alerts.push(this.alertOkay);
        }
        else{
          _alerts.push(alert)
        }
    }
    this.alerts = _alerts;
    this.notify.emit(this.alertOkay);
  }
  cancel():void{
    this.alertOkay=null;
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
    let dt = this.convertUTCDateToLocalDate(new Date(date));

    return 'le ' + (dt.getDay()+1)+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()+' à '+dt.getHours()+':'+dt.getMinutes();
  }
  convertUTCDateToLocalDate(date:Date):Date {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    console.log("offset",offset);

    var hours = date.getHours();

    newDate.setHours(hours + offset);
    console.log("after convert",newDate);

    return newDate;   
}

}
