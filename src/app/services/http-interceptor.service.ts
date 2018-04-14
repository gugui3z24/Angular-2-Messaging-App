import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let httpOptions;
    if (token) {
      httpOptions = req.clone({ headers: req.headers.set('Content-Type', 'application/json').append('session', token) });
    } else {
      httpOptions = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    return next.handle(httpOptions);
  }
  constructor() { }

}
