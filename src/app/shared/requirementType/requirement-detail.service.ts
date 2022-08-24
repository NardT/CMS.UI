import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequirementType } from 'src/app/components/requirementstype/requirementType.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = "https://localhost:5001/api/v1/requirementtype/"

  getAllRequirementType(): Observable<RequirementType[]> {
    return this.http.get<RequirementType[]>(this._BaseURL);
  }

  postRequirementType(addRequirementType : RequirementType): Observable<RequirementType> {
    return this.http.post<RequirementType>(this._BaseURL, addRequirementType);
  }

  putRequirementType(id : number,addRequirementType : RequirementType): Observable<RequirementType> {
    return this.http.put<RequirementType>(this._BaseURL + id, addRequirementType);
  }

  deleteRequirementType(id : number): Observable<RequirementType> {
    return this.http.delete<RequirementType>(this._BaseURL + id);
  }
}
