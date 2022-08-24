import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from 'src/app/components/requirements-dialog/requirements.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequirementsDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = environment.BaseURL;
  _EndPoint = environment.requirementEndPoint;

  getAllRequirement(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this._BaseURL + this._EndPoint);
  }
  
  AddRequirement(addRequirementRequest: Requirement): Observable<Requirement> {
   return this.http.post<Requirement>(this._BaseURL + this._EndPoint, addRequirementRequest);
  }

  updateRequirementType(id: number,addRequirementRequest: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(this._BaseURL + this._EndPoint + id, addRequirementRequest);
  }

  deleteRequirement(id : number): Observable<Requirement> {
    return this.http.delete<Requirement>(this._BaseURL + this._EndPoint + id);
  }

}
