import { Injectable } from '@angular/core';
import { Http, Response , Headers,URLSearchParams } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  private baseUrl: string = 'http://127.0.0.1:8000/o/token';
  private application_key = '7lUesSIoMIvN3r4FCBakVWp4IwQAu6tMlmRjQD8o';
  public  access_token: string;
  private refresh_token: string;
  private expires_in=0;

  constructor(private http : Http){
    console.log("I am in the constructor");
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.access_token = currentUser && currentUser.access_token;
    this.refresh_token = currentUser && currentUser.refresh_token;
    this.expires_in = currentUser && currentUser.expires_in;

  }

  public getAccessToken(): string{

    /*var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("current user is not null");
    this.access_token = currentUser && currentUser.access_token;
    this.refresh_token = currentUser && currentUser.refresh_token;
    this.expires_in = currentUser && currentUser.expires_in;
*/  if(this.expires_in==null){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("I am in the get access token method");
      this.access_token = currentUser && currentUser.access_token;
      this.refresh_token = currentUser && currentUser.refresh_token;
      this.expires_in = currentUser && currentUser.expires_in;
    }
    //setTimeout(()=>{
    if(this.expires_in < new Date().getTime()){
        console.log('access token has expired');
        this.refreshToken(this.refresh_token).subscribe(
                result =>{
                          if (result === true) {return this.access_token;} 
                          else {return null;}
                        },
                (err)=> {return null});
    }
    //}, 1500);
    console.log('Access token is still valid ');
    return this.access_token;
  }

  obtainAccessToken(username, password) : Observable<Boolean>{
    console.log('obtain new access token');

    let url = new URLSearchParams();

    url.append('client_id', this.application_key);
    url.append('grant_type', 'password');
    url.append('username', username);
    url.append('password', password);

    var body = url.toString();

    let  response =  this
        .http
        .post(`${this.baseUrl}/`, body, {headers: this.getHeaders()})
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .map(mapResponse);
    return response;

  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.access_token = null;
    this.refresh_token = null;
    this.expires_in = null;
    localStorage.removeItem('currentUser');
  }

  private refreshToken(refresh_token: string):Observable<Boolean>{
    console.log('refreshing access token');

    let url = new URLSearchParams();
    url.append('client_id', this.application_key);
    url.append('grant_type', 'refresh_token');
    url.append('refresh_token', refresh_token);

    var body = url.toString();

    let  response =  this
        .http
        .post(`${this.baseUrl}/`, body, {headers: this.getHeaders()})
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))        
        .map(mapResponse);
    return response;

  }


  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    return headers;
  }
}

function mapResponse(response:Response):boolean{
  console.log('in map');
    let access_token = response.json() && response.json().access_token;
    let refresh_token = response.json() && response.json().refresh_token;
    let expires_in = response.json() && response.json().expires_in;

    if (access_token) {
        // set tokens properties
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in =  new Date().getTime() + (1000*expires_in);
        // store access token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(
          { "access_token": this.access_token,
            "refresh_token": this.refresh_token,
            "expires_in": this.expires_in}));
        console.log('access token stored');
        return true;
    }
      // error in response content
      console.log('no access token stored');
      return false;
  }