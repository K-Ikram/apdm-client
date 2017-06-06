import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Farm } from '../models/farm';
import { AuthService } from '../services/auth.service';

@Injectable()
export class FarmService{
  private baseUrl ='http://127.0.0.1:8000/api';

  constructor(private http : Http,
              private loginService: AuthService){
  }


  getFarms(farmsUrl :string): Observable<Farm[]> {
   return this.http.get(farmsUrl, {headers:this.getHeaders()})
        .map( (res:Response) =>res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

  private getHeaders(){
    let headers = new Headers();
    let accessToken = this.loginService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
