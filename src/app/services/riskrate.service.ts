import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { RiskRate } from '../models/riskrate';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RiskRateService{
  private baseUrl: string = 'http://127.0.0.1:8000/api';
  constructor(private http : Http,
              private authService: AuthService){
  }
  
  getRiskRates(crop:number, disease:number): Observable<RiskRate[]>{
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
  getAllCurrentRiskRates(): Observable<Response>{
    return this.http
      .get(`${this.baseUrl}/currentriskrates/`, {headers: this.getHeaders()})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  private getHeaders(){
    let headers = new Headers();
    let accessToken = this.authService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
