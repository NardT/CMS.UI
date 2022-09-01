import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Appconfig } from 'src/app/config/app-config';
import { VesselTypes } from 'src/app/interfaces/model/vesselType.';


@Injectable({
  providedIn: 'root'
})
export class VesseltypeDetailService {

  constructor(private cnfgsrvc: Appconfig ,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _endPoint = this.cnfgsrvc.vesselTypeEndPoint;


  getAllVesselType(): Observable <VesselTypes[]> {
    return this.http.get<VesselTypes[]>(this._BaseURL + this._endPoint);
  }

  postVesselTypes(addVesselTypeRequest: VesselTypes): Observable<VesselTypes> {
    return this.http.post<VesselTypes>(this._BaseURL + this._endPoint, addVesselTypeRequest);
  }

  deleteVesselType(id: number): Observable <VesselTypes> {
    return this.http.delete<VesselTypes>(this._BaseURL + this._endPoint + id);
  }

  putVesselType(id: number,addVesselTypeRequest: VesselTypes): Observable <VesselTypes> {
    return this.http.put<VesselTypes>(this._BaseURL + this._endPoint + id,addVesselTypeRequest);
  }

}
