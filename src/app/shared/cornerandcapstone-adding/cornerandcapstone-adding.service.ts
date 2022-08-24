import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Training } from 'src/app/components/cornerandcapstone-dialog/training.model';


@Injectable({
  providedIn: 'root'
})
export class CornerandcapstoneAddingService {

  _BaseURL = "https://localhost:5001/api/v1/training/"

  constructor(private http: HttpClient) {}

  getAllDetails(): Observable<Training[]> {
    return this.http.get<Training[]>(this._BaseURL)
  }

  postDetails(addTrainingRequest : Training): Observable<Training> {
    return this.http.post<Training>(this._BaseURL, addTrainingRequest)
  }

  putTrainingDetails(id: number,addTrainingRequest : Training): Observable<Training> {
    return this.http.put<Training>(this._BaseURL + id, addTrainingRequest);
  }

  deleteDetails(id : number): Observable<Training> {
    return this.http.delete<Training>(this._BaseURL + id);
  }

  getAllCornerandCapstone():Observable<Training[]> {
    return this.http.get<Training[]>(this._BaseURL);
  }


}
