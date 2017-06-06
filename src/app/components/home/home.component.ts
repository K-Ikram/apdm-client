import { Component, OnInit, Output } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ChangePswdComponent } from '../chngpswd/chngpswd.component';
import { LoginComponent } from '../authentication/login.component';
import { AlertsComponent } from '../alert/alerts.component';
import { RiskRateComponent } from '../riskrate/riskrate.component';
import { CropComponent } from '../crop-production/crop.component';
import { AddAnomalyComponent } from '../anomaly/add-anomaly.component';
import { PlotsComponent } from '../plot/plot.component';
import { CropProduction } from '../../models/crop-production';
import {MenuComponent} from '../menu/menu.component'
import {Alert} from '../../models/alert'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mapTabSelected :boolean= true;
  chart_disabled = true;
  @Output() alert:Alert;
  @Output() alert_menu:Alert;
  @Output() crop: CropProduction;
  @Output() risksOfCrops:Array<any>;


  constructor() { }

  ngOnInit() {
  }

  	showTab():void{
      this.mapTabSelected = !this.mapTabSelected;
      document.getElementById("map").classList.toggle("active");
      document.getElementById("chart").classList.toggle("active");
      
    }
	showMap():void{
	  	this.mapTabSelected = true;
		document.getElementById("map").className = "active";

	    document.getElementById("chart").className =
       	document.getElementById("chart").className.replace
      ( /(?:^|\s)active(?!\S)/g , '' );

	}
	showChart():void{
	  this.mapTabSelected = false;
	  document.getElementById("chart").className = "active";

	    document.getElementById("map").className =
       document.getElementById("map").className.replace
      ( /(?:^|\s)active(?!\S)/g , '' );

	}

  onNotify(crop:CropProduction):void {
    this.chart_disabled = false;
    this.crop = crop;
    this.showChart();
  }
    onNotifyRisks(message:any):void {
      this.risksOfCrops= message;    
  }
  onNotifyAlert(alert:Alert):void{
      this.alert_menu = alert;
      console.log("alert treated home sent to menucomponent",alert);
  }
  onNotifyMenu(alert:Alert):void{
      this.alert = alert;
      console.log("alert treated home sent to alertscomponent",alert);
  }

}
