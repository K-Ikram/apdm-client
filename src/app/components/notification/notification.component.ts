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
          this.elapsedTime = this.convertTime(this.alert.alert_date);
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
  convertTime(date:string):string{
      var period : string;
      let dt1 = new Date().getTime(); 
      let dt2 = new Date(date).getTime();
      console.log('dates',dt1,dt2);
      var time = ( dt1- dt2)/(1000*3600) ;
      console.log('time elapsed',time);
      if(time<0) {
          period = "valeur negative";
          return period;
      }
      if(time<1){
        time = time*60;
        period = Math.floor(time)+ ' minutes';
        if(time<1)
          time = time*60;
          period = Math.floor(time)+ ' secondes'
      }
      else{
        if(time>24){
          time = time/24;
          period = Math.floor(time) + ' jours'

          if(time>30){
            time = time/30;
            period = Math.floor(time)+ ' mois';
          }
        }
        else{
          period = Math.floor(time) + ' heures';
        }
      }
      return period;
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
