import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chngpswd',
  templateUrl:'./chngpswd.component.html',
  styleUrls:['./chngpswd.component.css']
})
export class ChangePswdComponent implements OnInit{
  old_pass : string;
  password : string;
  confirmed_password : string;
  message : string;
  match : boolean;
  color : string="red";
  className : string = "alert-success"
  faIcon : string = "fa fa-check";
  submitted : boolean = false;

  constructor(private userService: UserService,
             private router: Router){}

  ngOnInit(){
    this.match = true;
  }

  changePassword(){
        this.userService.changePassword(this.old_pass, this.password)
        .subscribe((response) => {
                          this.submitted = true;
                          this.className = "alert alert-success";
                          this.faIcon = "fa fa-check";                 
                          this.message = 'Votre mot de passe a été changé avec succès';},
                  (e)=> { 
                          this.submitted = true;
                          this.className = "alert alert-danger";
                          this.faIcon = "fa fa-remove";
                          this.message = 'Mot de passe incorrect !'; });
  }

   checkPasswordMatch() {
      
      if(this.password != this.confirmed_password){
          this.message = "Les deux mots de passe ne sont pas identiques !";
          this.match = false;
          this.color = "red";
      }
      else{
          this.message = "Les deux mots de passe sont identiques.";
          this.match = true;
          this.color = "green";

      }
}
}