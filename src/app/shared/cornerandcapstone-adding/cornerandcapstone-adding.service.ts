import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Training } from 'src/app/components/cornerandcapstone-dialog/training.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CornerandcapstoneAddingService {

  _BaseURL = environment.BaseURL;
  _EndPoint = environment.trainingEndPoint;

  constructor(private http: HttpClient) {}

  getAllDetails(): Observable<Training[]> {
    return this.http.get<Training[]>(this._BaseURL + this._EndPoint)
  }

  postDetails(addTrainingRequest : Training): Observable<Training> {
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
