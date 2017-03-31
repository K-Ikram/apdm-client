import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Plot } from './plot';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class PlotService{

  constructor(private http : Http,
              private loginService: AuthService){
  }
plotsUrl ='http://127.0.0.1:8000/api/plotsbyfarm/'

  getPlotsByFarm(id): Observable<Plot[]> {
   return this.http.get(this.plotsUrl+id, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

}

  private getHeaders(){
    let headers = new Headers();
    let accessToken = this.loginService.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }
}
