import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService, private _router:Router) { }

  ngOnInit() {
    this.userService.init();
  }

  get users(){
    return this.userService.getUserList();
  }

  openUserProfile(id:string){
    console.log("userid",id);
    this._router.navigate(['user-profile']);
  }

}

export class User {
  profile:Profile;
  data: Data;
  _id:String
  constructor(values: Object = {}) {
        Object.assign(this, values);
  }
}

interface Profile {
  username: String;
  picture: String;
}

interface Data {
  oauth:String;
  password:String;
}