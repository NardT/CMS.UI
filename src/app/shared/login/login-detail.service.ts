import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginDetailService {

  constructor(private http: HttpClient) {}

  postRequestToken(data :any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>("https://localhost:5001/api/tokens/", data,{headers: headers});
  }

  postRefreshToken(data: any) {
    const headers = new HttpHeaders({'tenant': 'CMS'});
    return this.http.post<any>("https://localhost:5001/api/tokens/refresh/", data,{headers: headers});
  }

}
