import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions, Response,URLSearchParams} from '@angular/http';
import { Disease } from '../models/disease';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class DiseaseService {

constructor(private loginService: AuthService,private http: Http) { }
	baseUrl='http://127.0.0.1:8000/api'

getDiseasesByCrop(id : number): Observable<Disease[]> {
  return this.http
  .get(`${this.baseUrl}/diseasesbycropproduction/${id}`, {headers:this.getHeaders()})
  .map( (res:Response) =>res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


}
getDisease(disease:number): Observable<Response>{
      return this.http
        .get(`${this.baseUrl}/disease/${disease}`, {headers: this.getHeaders()})
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
