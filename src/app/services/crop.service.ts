import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { RiskRate } from '../models/riskrate';
import { AuthService } from '../services/auth.service';
import { CropProduction} from '../models/crop-production';


@Injectable()
export class CropService{
  private baseUrl: string = 'http://127.0.0.1:8000/api';
  constructor(private http : Http,
              private authService: AuthService){
  }
  getCropProductionsByUser(): Observable<CropProduction[]> {
    return this.http.get(`${this.baseUrl}/crop/client/`, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }

  getCropProductionsByPlot(id): Observable<CropProduction[]> {
    return this.http.get(`${this.baseUrl}/cropproductionsbyplot/${id}`,
     {headers:this.getHeaders()}).map( (res:Response) =>res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  private getHeaders(){
    let headers = new Headers();
    let accessToken = this.authService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
