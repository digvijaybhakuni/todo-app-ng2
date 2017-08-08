import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../user/user.component';
import { AuthService } from '../auth/AuthService';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _location: Location,
    private _auth: AuthService,
    private notificationService: NotificationService,
    private _router: Router) { }

  ngOnInit() {
  }


  onSubmit(formData) {

    console.log(formData);

    if (formData.valid) {
      console.log('Form is Valid');

      const newUser = new User({
        profile: { username: formData.value.username, picture: 'http://randomuser.me/api/portraits/med/men/83.jpg' },
        data: { password: formData.value.psw, oauth: 'qwerty' }
      });
      console.log('newUser', newUser);
      this._auth.createUser(newUser).subscribe(
        res => { this.notificationService.success('User Created', () => this._router.navigate(['login'])); },
        err => { this.notificationService.error('User Faild'); }
      );
    }

  }

  onCancel() {
    this._location.back();
  }

}