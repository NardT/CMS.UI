import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/interfaces/common/base-service';
import { PaginationFilter } from 'src/app/interfaces/common/pagination-filter';
import { PaginationResponse } from 'src/app/interfaces/common/pagination-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseAPIService<T> implements BaseService<T> {
  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  abstract getApiEndpointUrl(): string

  search(keyword: string, pageIndex: number, pageSize: number, orderBy?: string[] | undefined): Observable<PaginationResponse<T>> {
    let action = 'search';
    let request: PaginationFilter = {
      pageNumber: pageIndex,
      pageSize: pageSize,
      orderBy: orderBy,
      advanceSearch: { fields: [], keyword: "" },
      keyword: keyword
    };
    return this.http.post<PaginationResponse<T>>(this.getApiEndpointUrl() + action, request);
  }

  add(addRequest: T): Observable<T> {
    return this.http.post<T>(this.getApiEndpointUrl(), addRequest);
  }

  update(id: string, editRequest: T): Observable<T> {
    return this.http.put<T>(this.getApiEndpointUrl() + id, editRequest);
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(this.getApiEndpointUrl() + id);
  }

}
