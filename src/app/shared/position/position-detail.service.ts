import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from 'src/app/components/positiontype/positiontype.model';


@Injectable({
  providedIn: 'root'
})
export class PositionDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = "https://localhost:5001/api/v1/positions/"

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(this._BaseURL);
  }
  
  AddPosition(addPositionRequest: Position): Observable<Position> {
   return this.http.post<Position>(this._BaseURL, addPositionRequest);
  }

  updatePositionType(id: number,addPositionRequest: Position): Observable<Position> {
    return this.http.put<Position>(this._BaseURL + id, addPositionRequest);
  }

  deletePosition(id : number): Observable<Position> {
    return this.http.delete<Position>(this._BaseURL + id);
  }

}
