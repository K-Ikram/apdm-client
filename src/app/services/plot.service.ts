import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Plot } from '../models/plot';
import { RiskRate } from '../models/riskrate';
import { AuthService } from '../services/auth.service';

@Injectable()
export class PlotService{

  constructor(private http : Http,
              private loginService: AuthService){
    var plot:Plot ;

  }
  private baseUrl ='http://127.0.0.1:8000/api';
  private openWeatherAPIkey = 'a248d7fedffcc68c5348f5b16f9429fe';
  private apiUrl= 'http://api.openweathermap.org/data/2.5/weather';

  getPlotsByFarm(id): Observable<Plot[]> {
   return this.http.get(this.baseUrl+'/plotsbyfarm/'+id, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getPlotByID(id): Observable<Plot> {
   return this.http.get(this.baseUrl+'/plots/'+id, {headers:this.getHeaders()})
      .map( (res:Response) =>res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getCurrentWeather(lat,lon): Observable<Response>{
    let request = this.apiUrl+'?lat='+lat+'&lon='+lon+'&APPID='+this.openWeatherAPIkey;
    let response = this.http
      .get(`${request}`)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      return response;
  }

  private getHeaders(){
    let headers = new Headers();
    let accessToken = this.loginService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
