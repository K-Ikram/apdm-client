import { Component, Input, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit{
 username: string;
 password: string;

  error : boolean;
  loading: boolean;
  returnUrl: string;

  constructor(private authService: AuthService,
             private route: ActivatedRoute,
             private router: Router, 
             private userService: UserService){
  }

  ngOnInit(){
       // reset login status
        this.authService.logout(); 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  
        console.log(this.returnUrl);
      }

  loginUser():void
  {
      this.loading = true;

      this.authService
      .obtainAccessToken(this.username,this.password)
      .subscribe((result) => {
                  if (result === true) {
                      // login successful
                      console.log('result = true');
                      this.setCurrentUser();
                      this.router.navigate([this.returnUrl]);

                   } else {
                      // login failed
                      console.log('result = false');
                  }
                  },
                (err)=> {
                  //alert("credentials are not valid");
                  console.log('Login failed');
                  this.error=true;
                },
                () =>  this.loading = false);
  }
  setCurrentUser(){
    localStorage.setItem('username', JSON.stringify(
          { "username": this.username}));
  }

}