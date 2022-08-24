import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let token = localStorage.getItem('token');
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'bearer '+token
      }
    })
    return next.handle(jwtToken);
  }
}
