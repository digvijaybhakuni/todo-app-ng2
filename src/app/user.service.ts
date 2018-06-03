import { Injectable } from '@angular/core';
import { User } from './user/user.component'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  users: User[] = [];
  constructor(private http: Http) { }

  init(){
    this.loadUser().subscribe(e => this.users = e);
  }

  getUserList():User[]{
    return this.users;
  }


  private loadUser(): Observable<User[]> {
    return this.http.get('api/users').map(e => e.json().users);
  }


  public checkUsername(username: string) {
    return this.http.post('api/users/check/username', {username}).map(e => e.json());
  }

}
