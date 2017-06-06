import { Component, Input, OnInit , Inject} from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router , NavigationEnd} from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ChangePswdComponent } from '../chngpswd/chngpswd.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'user-details',
  templateUrl:'./user-details.component.html',
  styleUrls: ['./user-details.component.css'],

})
export class UserDetailsComponent implements OnInit{
  user : User;
  errorMessage: string;
  successMessage: string;
  isLoading: boolean = true;
  submitted: boolean = false;
  genders: string[] = ['homme','femme'];
  languages: string[] = ['','arabic','french','english','german','spanish','italian'];
  constructor(private userService: UserService,
              @Inject(DOCUMENT) private document: Document){}

  ngOnInit(){
      this.userService
        .getProfile()
        .subscribe(
           /* happy path */ p => this.user = p,
           /* error path */ e => this.errorMessage = e,
           /* onComplete */ () => this.isLoading = false);
  }

  saveProfile(){
      this.isLoading = true;
      this.userService.updateProfile(this.user).subscribe(
     /* happy path */ p => {this.user = p;
                            this.successMessage = "Les informations de votre compte ont été modifiées avec succès";
                            this.document.body.scrollTop = 0;;
                          },

     /* error path */ e => {
                            this.errorMessage = "Une erreur s'est produite, veuillez réessayer";
                            this.document.body.scrollTop = 0;;
                            },
     /* onComplete */ () => {this.isLoading = false;
                             this.submitted = true}
                       );
  }

  state(b:boolean):string{
    if(b) return "activées";
    return "désactivées";
  }
}