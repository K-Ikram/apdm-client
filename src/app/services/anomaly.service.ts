import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions, Response,URLSearchParams} from '@angular/http';
import { Anomaly } from '../models/anomaly';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class AnomalyService {

constructor(private loginService: AuthService,private http: Http) { }

addAnomaly(anomaly) {


  return new Promise((resolve) => {
        this.http.post('http://127.0.0.1:8000/api/addAnomaly/', anomaly, {headers: this.getHeaders()}).subscribe((data) => {
            if(data.json().success) {
                console.log("anomaly added !");
                console.log(data.json());
                resolve(data);
            }
        });
        });
}


private getHeaders(){
  let headers = new Headers();
  let accessToken = this.loginService.getAccessToken();
  headers.append('Authorization', 'Bearer '+ accessToken);
  return headers;
}
}
