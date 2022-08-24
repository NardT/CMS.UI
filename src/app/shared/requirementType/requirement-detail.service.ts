import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequirementType } from 'src/app/components/requirementstype/requirementType.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequirementDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = environment.BaseURL;
  _EndPoint = environment.requirementTypeEndPoint;

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
