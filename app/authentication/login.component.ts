import { Component, Input, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit{
 @Input() username: string;
 @Input() password: string;

  error : string;
  loading: boolean;
  returnUrl: string;

  constructor(private authService: AuthService,
         private route: ActivatedRoute,
             private router: Router){}

  ngOnInit(){
       // reset login status
        this.authService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  
        console.log(this.returnUrl);
      }



  loginUser()
  {
      this.loading = true;
      try{
          this.authService
          .obtainAccessToken(this.username,this.password)
                .subscribe(result => {
                    if (result === true) {
                        // login successful
                        this.loading = false;
                        console.log('result = true');
                        this.router.navigate([this.returnUrl]);
                    } else {
                        // login failed
                        this.loading = false;
                        console.log('result = false');
                  }
                });
      }
      catch (err){
          this.error = 'Username or password is incorrect';          
          console.log('exception!', err, this.error);
      }
  }

}