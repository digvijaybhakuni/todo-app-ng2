import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpService} from "./http.service";
import { Router} from '@angular/router';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router): Http {
    return new HttpService(xhrBackend, requestOptions, router);
}