import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequirementType } from 'src/app/interfaces/model/requirementType.model';
import { Observable } from 'rxjs';
import { Appconfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class RequirementDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _EndPoint = this.cnfgsrvc.requirementTypeEndPoint;

  getAllRequirementType(): Observable<RequirementType[]> {
    return this.http.get<RequirementType[]>(this._BaseURL + this._EndPoint);
  }

  postRequirementType(addRequirementType : RequirementType): Observable<RequirementType> {
    return this.http.post<RequirementType>(this._BaseURL + this._EndPoint, addRequirementType);
  }

  putRequirementType(id : number,addRequirementType : RequirementType): Observable<RequirementType> {
    return this.http.put<RequirementType>(this._BaseURL + this._EndPoint + id, addRequirementType);
  }

  deleteRequirementType(id : number): Observable<RequirementType> {
    return this.http.delete<RequirementType>(this._BaseURL + this._EndPoint + id);
  }
}
