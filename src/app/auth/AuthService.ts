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

    private userAuthenticted:boolean = false; 
    private token:String = null;

    
    constructor(private http: Http){}

    isAuthenticated():boolean{
        return this.userAuthenticted;
    }

    authenticate(data): Observable<any>{
        console.log("data", data);
        return this.http.post("api/auth", data)
        .map(res => {
            var err = res.json().error;
            var token = res.json().token;
            if(!err && token){
                this.setToken(token);
                return new AuthResult({status: true, msg: "User is Authenticated"});
            }
            return new AuthResult({status: true, msg: err});
        });
    }

    private setToken(e){
        this.userAuthenticted = true;
        this.token = e;
        AppData.token = e;
    }


}



@Injectable()
export class AuthGuard implements CanActivate{
  
  constructor(private auth:AuthService, private router: Router){}

  canActivate(): Observable<boolean> | boolean{
     if(!this.auth.isAuthenticated()){
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