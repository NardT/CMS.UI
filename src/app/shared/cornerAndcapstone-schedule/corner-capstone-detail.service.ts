import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CornerCapstoneDetailService {

  constructor(private http: HttpClient) {}

  getAllDetails() {
    return this.http.get<any>("http://localhost:8000/cornerstonescheduling/")
  }

  postDetails(data : any) {
    return this.http.post<any>("http://localhost:8000/cornerstonescheduling/", data)
  }

}
