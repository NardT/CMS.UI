import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDetailService } from './shared/login/login-detail.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inject: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(LoginDetailService);
    let authreq = request;

    authreq = this.AddTokenHeader(request,authservice.GetToken());
    return next.handle(authreq).pipe(
      catchError(errordata=> {
        if(errordata.status === 401) {
            // need to implement logout
            authservice.LogOut();
            //refresh token logic
          
        }
        return throwError(errordata);
      })
    );
    request = request.clone({
      headers: request.headers.set('tenant','CMS')
    })
    
    return next.handle(request);
  }


  AddTokenHeader(request: HttpRequest<any>,token: any) {
    return request.clone({headers: request.headers.set('Authorization','bearer '+token)});
  }

  HandleRefreshToken() {

  }

}

