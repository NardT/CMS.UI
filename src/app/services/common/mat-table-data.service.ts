import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/interfaces/common/pagination-response';
@Injectable({
  providedIn: 'root'
})
export class MatTableDataService<T> {

 private providedObservable: Observable<PaginationResponse<T>>;
 private dataSource: MatTableDataSource<T> = new MatTableDataSource();
 private paginator: MatPaginator;
 private sort: MatSort;
 private onSuccessCallback?: Function;
 private onFailedCallback?: Function;

  constructor(dataSource: MatTableDataSource<T>) { 
    this.dataSource = dataSource;
  }

  setDataSource(dataSource: MatTableDataSource<T>) {
    this.dataSource = dataSource;
    return this;
  }

  setService(providedObservable: Observable<PaginationResponse<T>>) {
    this.providedObservable = providedObservable;
    return this;
  }

  setPaginator(paginator: MatPaginator){
    this.paginator = paginator;
    return this;
  }

  setSort(sort: MatSort){
    this.sort = sort;
    return this;
  }

  setOnSuccess(onSuccessCallback?: Function) {
    this.onSuccessCallback = onSuccessCallback;
    return this;
  }

  setOnFailure(onFailedCallback?: Function) {
    this.onFailedCallback = onFailedCallback;
    return this;
  }

  loadData() {
    this.providedObservable.subscribe({
      next: (response) => {

        this.dataSource.data = response.data;
        this.paginator.length = response.totalCount;

        if (this.onSuccessCallback)
          this.onSuccessCallback(response);

      },
      error: (reponse) => {

        if (this.onFailedCallback)
          this.onFailedCallback(reponse);

      }
    })
  }

}
