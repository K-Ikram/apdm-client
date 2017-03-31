import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chngpswd',
  templateUrl:'./chngpswd.component.html'
})
export class ChangePswdComponent implements OnInit{
  old_pass : string;
  password : string;
  confirmed_password : string;
  message : string;
  match : boolean;
  constructor(private userService: UserService,
             private router: Router){}

  ngOnInit(){
    this.match = true;
  }

  changePassword(){
    try{
        this.userService.changePassword(this.old_pass, this.password)
        .subscribe(response => {
                        if (response.json() === 'Success.') {
                            console.log('password changed successfully');
                        } else {
                            // login failed
                            console.log('password incorrect');
                        }
                    });
    }
    catch(err){
        console.log('error in saving your new password');
    }
  }

   checkPasswordMatch() {

      if (this.password != this.confirmed_password){
          this.message = "Les deux mots de passe ne sont pas identiques!";
          this.match = false;
      }
      else{
          this.message = "Les deux mots de passe sont identiques.";
          this.match = true;

      }
}
}