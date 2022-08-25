import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vessel } from 'src/app/components/vesseltype/vesseltype.model';
import { Appconfig } from 'src/app/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class VesselDetailService {

  constructor(private cnfgsrvc: Appconfig,private http: HttpClient) {}

  _BaseURL = this.cnfgsrvc.BaseUrl;
  _EndPoint = this.cnfgsrvc.vesselEndPoint;


  getAllVessel(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(this._BaseURL + this._EndPoint);
  }

  postVessel(addVesselRequest: Vessel): Observable<Vessel> {
    return this.http.post<Vessel>(this._BaseURL + this._EndPoint, addVesselRequest);
  }

  putVesselType(id: number,addVesselRequest: Vessel): Observable<Vessel> {
    return this.http.put<Vessel>(this._BaseURL + this._EndPoint + id, addVesselRequest);
  }

  deleteVessel(id : number): Observable<Vessel>  {
    return this.http.delete<Vessel>(this._BaseURL + this._EndPoint + id);
  }

}
