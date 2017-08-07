import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user/user.component';
import { AuthService } from '../auth/AuthService';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _location: Location, private _auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
  }


  onSubmit(formData) {

    console.log(formData);

    if (formData.valid) {
      console.log("Form is Valid");

      let newUser = new User({ profile: { username: formData.value.username, picture: "http://randomuser.me/api/portraits/med/men/83.jpg" }, data: { password: formData.value.psw, oauth: "qwerty" } });
      console.log("newUser", newUser);
      this._auth.createUser(newUser).subscribe(
        res => { this.notificationService.success("User Created"); console.log(res); },
        err => { this.notificationService.error("User Faild"); console.log(err); }
      );
    }

  }

  onCancel() {
    this._location.back();
  }


}
