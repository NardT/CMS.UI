import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appconfig } from '../config/app-config';
import { Position } from '../interfaces/model/position';
import { BaseAPIService } from './common/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseAPIService<Position> {
  
  protected config: Appconfig;

  constructor(config: Appconfig,
     http: HttpClient) { 
    super(http);
    this.config = config;
  }

  getApiEndpointUrl(): string {
    return this.config.BaseUrl + this.config.positionEndPoint;
  }

}
