import { Component } from '@angular/core';
import { AuthService } from './auth/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
   
   constructor(private auth:AuthService, private router: Router){}

  /*get todos(){
    return this.todoDataService.getAllTodos();
  }*/

  logout(){
    this.auth.logout();
    this.router.navigate([""]);
  }

  get isAuthenticated(){
    return this.auth.isAuthenticated();
  }

}
