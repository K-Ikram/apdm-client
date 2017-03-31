import { Injectable }    from '@angular/core';
import { Headers, Http , RequestOptions, Response,URLSearchParams} from '@angular/http';
import { Disease } from './disease';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class DiseaseService {

constructor(private loginService: AuthService,private http: Http) { }
diseaseUrl='http://127.0.0.1:8000/api/diseasesbycropproduction/'
getDiseasesByCrop(id : string): Observable<Disease[]> {


  return this.http.get(this.diseaseUrl+id, {headers:this.getHeaders()}).map( (res:Response) =>res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


}


private getHeaders(){
  let headers = new Headers();
  let accessToken = this.loginService.getAccessToken();
  headers.append('Authorization', 'Bearer '+ accessToken);
  return headers;
}
}
