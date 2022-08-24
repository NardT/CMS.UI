import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequirementMapping } from 'src/app/components/create-mapping/requirementmapping.model';
import { Position } from 'src/app/components/positiontype/positiontype.model';
import { Requirement } from 'src/app/components/requirements-dialog/requirements.model';
import { RequirementType } from 'src/app/components/requirementstype/requirementType.model';
import { Vessel } from 'src/app/components/vesseltype/vesseltype.model';
import { RequirementDetailService } from '../requirementType/requirement-detail.service';

@Injectable({
  providedIn: 'root'
})
export class RequirementmappingDetailService {

  constructor(private http: HttpClient) {}

  private _BaseURL = "https://localhost:5001/api/v1/requirementmapping/"
  private _BasePositionURL = "https://localhost:5001/api/v1/positions/"
  private _BaseRequirementURL = "https://localhost:5001/api/v1/requirements/"
  private _BaseRequirementTypeURL = "https://localhost:5001/api/v1/requirementtype/"
  private _BaseVesselURL = "https://localhost:5001/api/v1/vessels/"

  getAllRequirementMapping(): Observable<RequirementMapping[]> {
    return this.http.get<RequirementMapping[]>(this._BaseURL);
  }

  postRequirementMapping(addRequirementMappingRequest: RequirementMapping): Observable<RequirementMapping> {
    console.log(addRequirementMappingRequest);
    return this.http.post<RequirementMapping>(this._BaseURL, addRequirementMappingRequest);
  }

  putRequirementMapping(id : number,addRequirementMappingRequest : RequirementMapping): Observable<RequirementMapping> {
    return this.http.put<RequirementMapping>(this._BaseURL + id, addRequirementMappingRequest);
  }

  deleteRequirementMapping(id : number): Observable<RequirementMapping> {
    return this.http.delete<RequirementMapping>(this._BaseURL + id);
  }

  getAllPosition():Observable<Position[]> {
    return this.http.get<Position[]>(this._BasePositionURL);
  }

  getAllRequirements():Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this._BaseRequirementURL);
  }

  getAllRequirementType():Observable<RequirementType[]> {
    return this.http.get<RequirementType[]>(this._BaseRequirementTypeURL);
  }

  getAllVessel():Observable<Vessel[]> {
    return this.http.get<Vessel[]>(this._BaseVesselURL);
  }



}
