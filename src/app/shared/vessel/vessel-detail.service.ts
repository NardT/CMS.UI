import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vessel } from 'src/app/components/vesseltype/vesseltype.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VesselDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = environment.BaseURL;
  _EndPoint = environment.vesselEndPoint;


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
