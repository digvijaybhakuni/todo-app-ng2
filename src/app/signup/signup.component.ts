import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user/user.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }


  onSubmit(formData) {

    console.log(formData);

    if (formData.valid) {
      console.log("Form is Valid");

      let newUser = new User({ profile: { username: formData.username, picture: "https://randomuser.me/api/portraits/med/men/83.jpg" }, data: { password: formData.psw } });

    }

  }

  onCancel() {
    this._location.back();
  }


}
