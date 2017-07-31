import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResult } from '../auth/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(private auth: AuthService, private router: Router) { }

  onSubmit(formData) {
    console.log(formData);
    if(formData.valid){
      this.auth.authenticate({username: formData.value.loginId, password: formData.value.password})
      .subscribe(e => {

        console.log(e);
        if(e.status){
          this.router.navigate(['users']);
        }
        this.error = e.msg;
      });
    }
  }

  ngOnInit() {
  }

}
