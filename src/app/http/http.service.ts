import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
//import { environment } from "../app.env";
import { environment } from "../../environments/environment";
import { AppData } from "../app.data";
import { Router} from '@angular/router';

@Injectable()
export class HttpService extends Http{

    private _router: Router 
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {
        console.log(" HttpService ");
        super(backend, defaultOptions);
        this._router = router;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch(this.onCatch);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

     post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        console.log("Req Url " + req);
        //environment.origin = "http://localhost:3000/"
        console.log("environment.origin", environment.origin);
        environment.origin
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('X-APP-DVJ', 'db');
        
        if(AppData.token){
            options.headers.append('Authorization', "Bearer "+AppData.token);            
        }

        console.log("Set Request Options");
        
        return options;
    }

   private onCatch(error: any, caught: Observable<any>): Observable<any> {
       console.log("Error", error);
       console.log("res [Ob]", caught);
        return Observable.throw(error);
    }


    private intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
			if (err.status  == 401) {
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
			}
        });
    }

}