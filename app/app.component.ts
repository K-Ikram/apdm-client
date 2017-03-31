import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
    title: String = 'Agile plant disease monitoring';

    constructor(private authService : AuthService,
              private router: Router){}

    logout():void{
    	this.authService.logout();
    	this.router.navigate(['/login']);
    }
}
