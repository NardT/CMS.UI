import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Training } from 'src/app/interfaces/model/training';
import { Appconfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class CornerandcapstoneAddingService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _EndPoint = this.cnfgsrvc.trainingEndPoint;

  getAllDetails(): Observable<Training[]> {
    return this.http.get<Training[]>(this._BaseURL + this._EndPoint)
  }

  postDetails(addTrainingRequest : Training): Observable<Training> {
    console.log(addTrainingRequest);
    return this.http.post<Training>(this._BaseURL + this._EndPoint, addTrainingRequest)
  }

  putTrainingDetails(id: number,addTrainingRequest : Training): Observable<Training> {
    return this.http.put<Training>(this._BaseURL + this._EndPoint + id, addTrainingRequest);
  }

  deleteDetails(id : number): Observable<Training> {
    return this.http.delete<Training>(this._BaseURL + this._EndPoint + id);
  }

  getAllCornerandCapstone():Observable<Training[]> {
    return this.http.get<Training[]>(this._BaseURL + this._EndPoint);
  }


}
