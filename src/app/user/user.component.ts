import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.init();
  }

  get users(){
    return this.userService.getUserList();
  }

}

export class User {
  profile:Profile;
  data: Data;

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