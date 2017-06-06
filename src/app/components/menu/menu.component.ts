import { Component, OnInit, Input ,Output, EventEmitter,SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert'
import { AddAnomalyComponent } from '../anomaly/add-anomaly.component';
declare var $: any;

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private username: string;
  private title =" My Smart farm";
  private alerts : Alert[];
  private alertCount : number = 0;
  @Input() menuAlert: Alert;
  @Output() notify: EventEmitter<Alert> = new EventEmitter<Alert>();

  constructor(private authService : AuthService,
              private alertService:AlertService,
              private router: Router) { }

  
  ngOnInit(){
      this.getCurrentUser();
      this.alertService.getNonConfirmedAlerts().subscribe(alerts=>{
          this.alerts = alerts;
          this.alertCount = alerts.length;
      },
      (error)=>{
          console.log(error);
          //alert("erreur serveur dans menu compoent");
          this.router.navigate(['/login']);
      });

    }

    logout():void{
    	  this.authService.logout();
      	this.username = null;
    	  this.router.navigate(['/login']);
    }
    
    getCurrentUser():void{
      var currentUser = JSON.parse(localStorage.getItem('username'));
      let username = currentUser && currentUser.username;
      if(username)
          this.username = username;
    } 

    onNotify(alert:Alert):void{
      this.alertCount = this.alertCount -1;
      this.notify.emit(alert);
      console.log(alert, "has being read");
    }

    ngOnChanges(changes: SimpleChanges): void {
    if(changes["menuAlert"].currentValue)
      {   
          this.alertCount=this.alertCount-1;
          var _alerts :Alert[] = [];
          for(let alert of this.alerts){
              if(alert.alert_id==this.menuAlert.alert_id){
                //_alerts.push(this.menuAlert);
                 console.log("this alert has been treated in alerts component", this.menuAlert);
              }
              else{
                _alerts.push(alert);
                console.log(alert);
              }
          }
          this.alerts = _alerts;
          console.log("alerts in menu after change", _alerts, this.alerts, this.alertCount);
      }
    
  }  


    
}
