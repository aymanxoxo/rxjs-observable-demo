import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/defer';
import "rxjs/add/operator/multicast";
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/publish";
import "rxjs/add/operator/publishLast";
import { switchMap } from 'rxjs/operator/switchMap';
import "rxjs/add/observable/of";
import { ObservableInput } from 'rxjs/Observable';

@Injectable()
export class HttpService {

    private _baseUrl: string = 'http://localhost:50717/'

    constructor(private httpClient: HttpClient) {
        
    }

    

    public Get<T>(url: string, params?: { [key: string]: string }): Observable<T> {
        
        var result$ = this.httpClient.get<T>(this._baseUrl + url).publish().refCount();
        
        return result$;
    }

    public Put<T>(url: string, body?: any): Observable<T> {
        var result$ = this.httpClient.put<T>(this._baseUrl + url, body);

        result$.subscribe(
            data => data,
            erro => console.log('error logged from the service before the host')
        );

        return result$;
    }
}