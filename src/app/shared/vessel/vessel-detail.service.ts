import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vessel } from 'src/app/components/vesseltype/vesseltype.model';

@Injectable({
  providedIn: 'root'
})
export class VesselDetailService {

  constructor(private http: HttpClient) {}

  _BaseURL = "https://localhost:5001/api/v1/vessels/"


  getAllVessel(): Observable<Vessel[]> {
    return this.http.get<Vessel[]>(this._BaseURL);
  }

  postVessel(addVesselRequest: Vessel): Observable<Vessel> {
    return this.http.post<Vessel>(this._BaseURL, addVesselRequest);
  }

  putVesselType(id: number,addVesselRequest: Vessel): Observable<Vessel> {
    return this.http.put<Vessel>(this._BaseURL + id, addVesselRequest);
  }

  deleteVessel(id : number): Observable<Vessel>  {
    return this.http.delete<Vessel>(this._BaseURL + id);
  }

}
