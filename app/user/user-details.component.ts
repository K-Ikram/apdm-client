import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-details',
  templateUrl:'./user-details.component.html',
  styleUrls: ['./user-details.component.css'],

})
export class UserDetailsComponent implements OnInit{
  user : User;
  errorMessage: string = '';
  isLoading: boolean = true;
  genders: string[] = ['homme','femme'];
  languages: string[] = ['','araic','french','english','german','spanish','italian'];
  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit(){
      this.userService
        .getProfile()
        .subscribe(
           /* happy path */ p => this.user = p,
           /* error path */ e => this.errorMessage = e,
           /* onComplete */ () => this.isLoading = false);
  }

  saveProfile(){
      this.userService.updateProfile(this.user).subscribe(
             /* happy path */ p => this.user = p,
             /* error path */ e => this.errorMessage = e,
             /* onComplete */ () => this.isLoading = false);
  }
}