import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appconfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _TokenUrl = this.cnfgsrvc.TokenUrl;
  _RefreshTokenUrl = this.cnfgsrvc.RefreshToken;

  postRequestToken(data :any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>(this._TokenUrl, data,{headers: headers});
  }

  postRefreshToken(data: any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>(this._RefreshTokenUrl, data,{headers: headers});
  }

}
