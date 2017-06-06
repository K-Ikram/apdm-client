import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
    constructor(private router: Router){}
    ngOnInit() {
  }
  getBodyClass(){
  	if(this.router.url.indexOf("/login") >-1){
  		return "login-body";
  	}
  	else {
	  		return "app-body";
  	}
  }

}
