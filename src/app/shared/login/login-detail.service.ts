import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appconfig } from 'src/app/config/app-config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient,private router: Router) {}

  _TokenUrl = this.cnfgsrvc.TokenUrl;
  _RefreshTokenUrl = this.cnfgsrvc.RefreshToken;

  proceedLogin(data :any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>(this._TokenUrl, data,{headers: headers});
  }

  postRefreshToken(data: any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>(this._RefreshTokenUrl, data,{headers: headers});
  }

  isLogged() {
    return localStorage.getItem("token") != null;
  }

  GetToken() {
    return localStorage.getItem("token") || '';
  }

  LogOut() {
    alert('Your session is expired')
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
