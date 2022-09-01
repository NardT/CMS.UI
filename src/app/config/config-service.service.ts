import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appconfig } from "./app-config";


@Injectable({
    providedIn: 'root'
})
export class ConfigService extends Appconfig {
    constructor(private http: HttpClient) {
        super();
    }

    //This function needs to return a Promise
    load() {
        return this.http.get<Appconfig>('config.json')
        .toPromise()
        .then(data => {
            this.BaseUrl = data!.BaseUrl;
            this.TokenUrl = data!.TokenUrl;
            this.RefreshToken = data!.RefreshToken;
            this.positionEndPoint = data!.positionEndPoint;
            this.requirementEndPoint = data!.requirementEndPoint;
            this.requirementTypeEndPoint = data!.requirementTypeEndPoint;
            this.trainingEndPoint = data!.trainingEndPoint;
            this.vesselEndPoint = data!.vesselEndPoint;
            this.vesselTypeEndPoint = data!.vesselTypeEndPoint;
            this.requirementMappingEndPoint = data!.requirementMappingEndPoint;
            this.homeEndPoint = data!.homeEndPoint;
            this.search = data!.search;
        })
        .catch(() => {
            console.error('could not load configuration');
        });
    }

}