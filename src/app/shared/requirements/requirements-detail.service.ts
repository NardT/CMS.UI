import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirement } from 'src/app/components/requirements-dialog/requirements.model';
import { Appconfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class RequirementsDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _EndPoint = this.cnfgsrvc.requirementEndPoint;

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
