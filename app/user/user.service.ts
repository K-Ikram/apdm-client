import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from '../authentication/auth.service';
import { User } from './user';

@Injectable()
export class UserService{
  private baseUrl: string = 'http://127.0.0.1:8000/api';
  constructor(private http : Http,
            private auth: AuthService){
  }


  getProfile(): Observable<User>{
    return this.http
      .get(`${this.baseUrl}/currentClient/`, {headers: this.getHeaders()})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .map(mapUser);
  }

  updateProfile(user: User): Observable<User>{
    console.log('updating your profile');
    return this.http
      .put(`${this.baseUrl}/updateProfile/${user.client_id}`, JSON.stringify(user), {headers: this.getHeaders()})
      .map(mapUser);
  }

  changePassword(oldPass: string, newPass: string): Observable<Response>{
    console.log('updating your password');

    return this.http
      .put(`${this.baseUrl}/changepswd/`,JSON.stringify({"old_password": oldPass,"new_password": newPass}),{headers: this.getHeaders()});
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

function mapUser(response:Response): User{
   console.log('am in the get profile function')
   return toUser(response.json());
}

function toUser(r:any): User{

  let user = <User>({
    client_id: r.client_id,    
    phone_contact: r.phone_contact,
    phone_sms: r.phone_sms,
    email: r.email,
    first_name: r.first_name,
    last_name: r.last_name,
    username: r.username,
    gender: r.gender,
    language: r.language,
    date_joined: r.date_joined,
    is_staff: r.is_staff,
    is_active: r.is_active,
    is_superuser: r.is_superuser,
    last_login: r.last_login
  });
  return user;
}