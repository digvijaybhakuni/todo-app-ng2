import {Component} from '@angular/core';
import {AuthService} from './auth/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private showMenu = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  /*get todos(){
    return this.todoDataService.getAllTodos();
  }*/

  logout() {
    this.auth.logout();
    this.router.navigate(['/loigin']);
  }

  toggleMenu(ev) {
    this.showMenu = !this.showMenu;
  }


  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

}
