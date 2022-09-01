import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequirementMapping } from 'src/app/components/create-mapping/requirementmapping.model';
import { Requirement } from 'src/app/interfaces/model/requirements.model';
import { RequirementType } from 'src/app/interfaces/model/requirementType.model';
import { Vessel } from 'src/app/interfaces/model/vessel';
import { RequirementDetailService } from '../requirementType/requirement-detail.service';
import { Appconfig } from 'src/app/config/app-config';
import { VesselTypes } from 'src/app/interfaces/model/vesselType.';
import { RequirementsMappings } from 'src/app/components/create-mapping/requirementsmappings.model';
import { Position } from 'src/app/interfaces/model/position';


@Injectable({
  providedIn: 'root'
})
export class RequirementmappingDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _endPointRequirementMapping = this.cnfgsrvc.requirementMappingEndPoint;
  _endPointPosition = this.cnfgsrvc.positionEndPoint;
  _endPintRequirements = this.cnfgsrvc.requirementEndPoint;
  _endPintRequirementType = this.cnfgsrvc.requirementTypeEndPoint;
  _endPintVesselType = this.cnfgsrvc.vesselTypeEndPoint;

  getAllRequirementMapping(): Observable<RequirementMapping[]> {
    return this.http.get<RequirementMapping[]>(this._BaseURL + this._endPointRequirementMapping);
  }

  postRequirementMapping(addRequirementMappingRequest: RequirementsMappings): Observable<RequirementsMappings> {
    return this.http.post<RequirementsMappings>(this._BaseURL + this._endPointRequirementMapping, addRequirementMappingRequest);
  }

  putRequirementMapping(id : number,addRequirementMappingRequest : RequirementsMappings): Observable<RequirementsMappings> {
    return this.http.put<RequirementsMappings>(this._BaseURL + this._endPointRequirementMapping + id, addRequirementMappingRequest);
  }

  deleteRequirementMapping(id : number): Observable<RequirementMapping> {
    return this.http.delete<RequirementMapping>(this._BaseURL + this._endPointRequirementMapping + id);
  }

  getAllPosition():Observable<Position[]> {
    return this.http.get<Position[]>(this._BaseURL + this._endPointPosition);
  }

  getAllRequirements():Observable<Requirement[]> {
    return this.http.get<Requirement[]>(this._BaseURL + this._endPintRequirements);
  }

  getAllRequirementType():Observable<RequirementType[]> {
    return this.http.get<RequirementType[]>(this._BaseURL + this._endPintRequirementType);
  }

  getAllVessel():Observable<VesselTypes[]> {
    return this.http.get<VesselTypes[]>(this._BaseURL + this._endPintVesselType);
  }



}
