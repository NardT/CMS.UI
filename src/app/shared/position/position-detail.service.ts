import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from 'src/app/components/positiontype/positiontype.model';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class PositionDetailService {

  constructor(private cnfgsrvc: ConfigService,private http: HttpClient) {}

  _BaseURL = environment.BaseURL;
  _endPoint = environment.positionEndPoint;

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
