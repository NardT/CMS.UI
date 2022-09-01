import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, ShareConfig } from 'rxjs';
import { Appconfig } from 'src/app/config/app-config';
import { Position } from 'src/app/interfaces/model/position';

@Injectable({
  providedIn: 'root'
})
export class PositionDetailService {

  constructor(private cnfgsrvc: Appconfig ,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _endPoint = this.cnfgsrvc.positionEndPoint;

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(this._BaseURL + this._endPoint);
  }
  
  AddPosition(addPositionRequest: Position): Observable<Position> {
   return this.http.post<Position>(this._BaseURL + this._endPoint, addPositionRequest);
  }

  updatePositionType(id: number,addPositionRequest: Position): Observable<Position> {
    return this.http.put<Position>(this._BaseURL + this._endPoint + id, addPositionRequest);
  }

  deletePosition(id : number): Observable<Position> {
    return this.http.delete<Position>(this._BaseURL + this._endPoint + id);
  }

}
