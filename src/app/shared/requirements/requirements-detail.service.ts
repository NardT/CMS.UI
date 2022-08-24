import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from 'src/app/components/requirements-dialog/requirements.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementsDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = "https://localhost:5001/api/v1/requirements/"

  getAllRequirement(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this._BaseURL);
  }
  
  AddRequirement(addRequirementRequest: Requirement): Observable<Requirement> {
   return this.http.post<Requirement>(this._BaseURL, addRequirementRequest);
  }

  updateRequirementType(id: number,addRequirementRequest: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(this._BaseURL + id, addRequirementRequest);
  }

  deleteRequirement(id : number): Observable<Requirement> {
    return this.http.delete<Requirement>(this._BaseURL + id);
  }

}
