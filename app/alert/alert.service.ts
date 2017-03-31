import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions, Response,URLSearchParams} from '@angular/http';
import { Alert } from './alert';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertService {

constructor(private auth: AuthService,private http: Http) { }

getAlerts(alertsUrl :string): Observable<Alert[]> {
 var headers = new Headers();

    headers.append('Authorization', 'Bearer '+ this.auth.getAccessToken());

  return this.http.get(alertsUrl, {headers:headers}).map( (res:Response) =>res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

}

confirmAlert(alert) {

  var headers = new Headers();

  headers.append('Authorization', 'Bearer '+ this.auth.getAccessToken());
  return new Promise((resolve) => {
        this.http.put('http://127.0.0.1:8000/api/alerts/'+
          alert.alert_id+'/confirm', alert, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                console.log("alert confirmed !");
                console.log(data.json());
                resolve(data);
            }
        });
        });
}

}
