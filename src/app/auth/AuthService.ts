import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { Http } from '@angular/http';
import { AppData } from '../app.data';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService{

    private userAuthenticted = false;
    private token: String;


    constructor(private http: Http){}

    isAuthenticated(): boolean {
        return this.userAuthenticted;
    }

    authenticate(data): Observable<AuthResult>{
        console.log('data', data);
        return this.http.post('api/auth', data)
        .map(res => {
            console.log('auth res', res);
            const err = res.json().error;
            const token = res.json().token;
            if(!err && token){
                this.setToken(token);
                return new AuthResult({status: true, msg: 'User is Authenticated'});
            }
            return new AuthResult({status: true, msg: err});
        }).catch((error: any) => {
            console.error('catch', error);
            return Observable.throw(new AuthResult({status: false, msg: error.json().error}));
        });
    }

    createUser(data): Observable<AuthResult>{
        console.log('', data);
        return this.http.post('api/users', data)
        .map(res => {
            console.log('auth res', res);
            const err = res.json().error;
            const token = res.json().token;
            if(!err && token){
                this.setToken(token);
                return new AuthResult({status: true, msg: 'User is Authenticated'});
            }
            return new AuthResult({status: true, msg: err});
        }).catch((error: any) => {
            console.error('catch', error);
            return Observable.throw(new AuthResult({status: false, msg: error.json().error}));
        });
    }


    logout(){
        this.resetToken();
    }

    private setToken(e){
        this.userAuthenticted = true;
        this.token = e;
        AppData.token = e;
    }

    private resetToken(){
        this.userAuthenticted = false;
        this.token = '';
        AppData.token = '';
    }


}



@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router){}

  canActivate(): Observable<boolean> | boolean{
     if(!this.auth.isAuthenticated()) {
        this.router.navigate([ '/login' ]);
        return false;
     } else {
       return true;
     }
  }
}

export class AuthResult {
    status: boolean;
    msg: String;
    constructor(values: Object = {}) {
        Object.assign(this, values);
  }
}