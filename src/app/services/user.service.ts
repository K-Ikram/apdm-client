import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable()
export class UserService{
  private baseUrl: string = 'http://127.0.0.1:8000/api';
  constructor(private http : Http,
            private auth: AuthService){
  }

  getProfile(): Observable<User>{
    return this.http
      .get(`${this.baseUrl}/currentClient/`, {headers: this.getHeaders()})
      .map(res => res.json());
  }

  updateProfile(user: User): Observable<User>{
    console.log('updating your profile',user);
    return this.http
      .put(`${this.baseUrl}/updateProfile/${user.client_id}`, JSON.stringify(user), {headers: this.getHeaders()})
      .map(res => res.json());
  }
  clientByUsername(username: string): Observable<User>{
    return this.http
      .get(`${this.baseUrl}/clientbyusername/${username}`, {headers: this.getHeaders()})
      .map(res => res.json());
  }
  changePassword(oldPass: string, newPass: string): Observable<Response>{
    console.log('updating your password');

    return this.http
      .put(`${this.baseUrl}/changepswd/`,JSON.stringify({"old_password": oldPass,"new_password": newPass}),{headers: this.getHeaders()})
      .map(res => res.json())
  }

  private getHeaders(){
    let headers = new Headers();
    let token = this.auth.getAccessToken();
    console.log(token)
    headers.append('Content-type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+token);
    return headers; 
   
  }
}