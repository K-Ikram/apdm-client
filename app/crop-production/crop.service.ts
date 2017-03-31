import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RiskRate } from './riskrate';
import { AuthService } from '../authentication/auth.service';
import { CropProduction} from './crop-production';


@Injectable()
export class CropService{
  private baseUrl: string = 'http://127.0.0.1:8000/api';
  private openWeatherAPIkey = 'a248d7fedffcc68c5348f5b16f9429fe';
  private apiUrl= 'http://api.openweathermap.org/data/2.5/weather';
  constructor(private http : Http,
              private authService: AuthService){
  }
  getCropProductionsByUser(cropsUrl :string): Observable<CropProduction[]> {


    return this.http.get(cropsUrl, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


  }

  getCropProductionsByPlot(id): Observable<CropProduction[]> {


    return this.http.get('http://127.0.0.1:8000/api/cropproductionsbyplot/'+id, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


  }

  getRiskRates(crop, disease): Observable<RiskRate[]>{
    return this.http
      .get(`${this.baseUrl}/riskrates/${crop}/${disease}`, {headers: this.getHeaders()})
      .map( (res:Response) =>res.json())
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getCurrentRiskRates(crop): Observable<RiskRate[]>{
    return this.http
      .get(`${this.baseUrl}/riskratesbycrop/${crop}`, {headers: this.getHeaders()})
      .map( (res:Response) =>res.json())
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getDisease(disease): Observable<Response>{
      return this.http
        .get(`${this.baseUrl}/disease/${disease}`, {headers: this.getHeaders()})
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
    let accessToken = this.authService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
