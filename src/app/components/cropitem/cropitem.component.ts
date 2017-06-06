import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { CropProduction } from '../../models/crop-production';
import { RiskRate } from '../../models/riskrate'
import { PlotService } from '../../services/plot.service'
import { FarmService } from '../../services/farm.service'
import { Plot } from '../../models/plot'
import { Observable} from 'rxjs/Rx';

@Component({
  selector: 'cropitem',
  templateUrl: './cropitem.component.html',
  styleUrls: ['./cropitem.component.css']
})
export class CropitemComponent implements OnInit {
	@Input() crop:CropProduction;
	@Input() risks:RiskRate[];
	city:string;
	weather: any;
  	constructor(private plotService:PlotService) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
    	if(changes["crop"])
      	{
      		this.getWeather(this.crop);
    	}
    }


	getWeather(crop:CropProduction):void{
		this.plotService.getPlotByID(crop.plot).subscribe(
			response=> {
				console.log(response);
	      		this.plotService
	      		.getCurrentWeather(response.latitude,response.longitude)
	      		.subscribe(weather=>{
	      			this.weather = weather.json();
	      			console.log(this.weather);
	      		},
	      		(error)=>{
	      			//alert("server error dans cropitem component");
	      		});
    	});
	}

  	getIcon():string{
  		return './src/assets/crop'+this.crop.crop["crop_id"]+'.jpg';
	}
	getClass(risk:RiskRate):string{
	  if(risk.risk_rate<0.25){
	    return 'progress-bar progress-bar-success';
	  }
	  if(risk.risk_rate<0.5){
	    return 'progress-bar progress-bar-warning';
	  }
	  return 'progress-bar progress-bar-danger';
	  
	}
	getValue(risk:RiskRate):number{
	  if(risk.risk_rate<0.25){
	    return (100-risk.risk_rate*100);
	  }
	  else{
	    return (risk.risk_rate*100);
	  }
	}
	getTemperature(t:number):number{
		return Math.floor(t-273.15);
	}


}
