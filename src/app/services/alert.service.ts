import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions, Response,URLSearchParams} from '@angular/http';
import { Alert } from '../models/alert';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertService {
  private  baseUrl :string = 'http://127.0.0.1:8000/api/'

constructor(private auth: AuthService,private http: Http) { }

getAlerts(alertsUrl :string): Observable<Alert[]> {

    return this.http.get(alertsUrl, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

}

getNonConfirmedAlerts():Observable<Alert[]>{
      return this.http
        .get(this.baseUrl+'nonconfirmedalerts/', {headers: this.getHeaders()})
        .map( (res:Response) =>res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
confirmAlert(alert){

  return new Promise((resolve) => {
        this.http.patch(this.baseUrl+"alerts/"+
          alert.alert_id+'/confirm', alert, {headers: this.getHeaders()}).subscribe((data) => {
            if(data.json().success) {
                console.log("alert confirmed !");
                console.log(data.json());
                resolve(data);
            }
        });
        });
}

declineAlert(alert){

  return new Promise((resolve) => {
        this.http.patch('http://127.0.0.1:8000/api/alerts/'+
          alert.alert_id+'/deny', alert, {headers: this.getHeaders()}).subscribe((data) => {
            if(data.json().success) {
                console.log("alert declined !");
                console.log(data.json());
                resolve(data);
            }
        });
        });
}

private getHeaders(){
    let headers = new Headers();
    let accessToken = this.auth.getAccessToken();
    headers.append('Authorization', 'Bearer '+ accessToken);
    return headers;
  }

}
