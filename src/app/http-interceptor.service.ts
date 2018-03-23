import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent,
HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | 
    HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).catch((err: HttpErrorResponse) => {
            console.log('error status: ' + err.status + " " + err.statusText);
            return Observable.throw(err);
        });
    }

}