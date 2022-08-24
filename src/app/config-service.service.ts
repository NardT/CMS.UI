import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ConfigService {

    private configObject: any;
    private configSubject: Subject<any> = new Subject<any>();
 
    constructor(private http: HttpClient) {}

    loadConfig(fileUrl: string): Promise<any> {
        return this.http
        .get(fileUrl)
        .toPromise()
        .then((configData: any) => {
            this.configObject = configData;
            console.log(this.configObject);
            this.configSubject.next(this.configObject);
        })
        .catch((err: any)=> {
            this.configObject = null;
            this.configSubject.next(this.configObject);
        });
    }

    getConfig() {
        return this.configObject;
    }

}