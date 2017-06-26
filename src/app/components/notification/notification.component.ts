import { Component, OnInit , Output, Input,SimpleChanges,EventEmitter} from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert'

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private alertService:AlertService) { }
  @Input() username:string;
  @Input() alert : Alert;
  @Output() notify: EventEmitter<Alert> = new EventEmitter<Alert>();
  private message:string;
  private elapsedTime : string;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["alert"].currentValue)
      {
          this.elapsedTime = convertTime(this.alert.alert_date);
          if(this.alert.feedback_type){
            if(this.alert.feedback_type==="denied"){
              this.message = 'Cette alerte a été déclinée';
            }
            else{
              this.message = 'Cette alerte a été confirmée';
            }
          }
      }
    
  } 

  confirm(): void {
     let date = new Date().toISOString();
     this.alert.feedback_date = date;
     this.alert.feedback_type="confirmed";
     this.alert.client = this.username;
     this.alertService.confirmAlert(this.alert);
     this.message = 'Cette alerte a été confirmée';
     this.notify.emit(this.alert);
  }

  decline(): void {
    let date = new Date().toISOString();
     this.alert.feedback_date = date;
     this.alert.feedback_type="denied";
     this.alert.client = this.username;
     this.alertService.declineAlert(this.alert);
     this.message = 'Cette alerte a été déclinée';
    this.notify.emit(this.alert);
  }

  getDiseaseImage(name:string):string{
    switch (name) {
      case "Fusariose de ble":
        return './src/assets/icons/crop1.jpg';
      
      default:
        return './src/assets/icons/crop2.jpg';
    }
    
  }


}
function convertUTCDateToLocalDate(date:Date):Date {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    console.log("offset",offset);

    var hours = date.getHours();

    newDate.setHours(hours + offset);
    console.log("after convert",newDate);

    return newDate;   
}

function convertTime(dateStr:string):string{
    var period : string;
    var dt1 = new Date().getTime();
    
    console.log("UTC alert date ",new Date(dateStr));
    var dt2 = convertUTCDateToLocalDate(new Date(dateStr)).getTime();
    console.log('alert date',convertUTCDateToLocalDate(new Date(dateStr)));
    console.log('current',new Date().toString())
    var hours = ( dt1- dt2)/(1000*3600) ;
    console.log('hours elapsed',hours);
    if(hours<0) {
        period = "Inconnue";
        return period;
    }
    if(hours<1){
      let minutes = hours*60;
      period = Math.floor(minutes)+ ' minutes';
      if(minutes<1){
        let seconds = minutes*60;
        period = Math.floor(seconds)+ ' secondes'          
      }
    }
    else{
      if(hours>24){
        let days = hours/24;
        period = Math.floor(days) + ' jours'

        if(days>30){
          let monthes = days/30;
          period = Math.floor(monthes)+ ' mois';
        }
      }
      else{
        period = Math.floor(hours) + ' heures';
      }
    }
    return period;
  }