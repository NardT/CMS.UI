import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from 'src/app/interfaces/common/base-service';
import { MatTableDataService } from 'src/app/services/common/mat-table-data.service';

@Component({
  template: "",
})
export abstract class BaseMatComponent<T> implements OnInit {

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  // spinner: NgxSpinnerService
  // tostr: ToastrService
  dataSource: MatTableDataSource<T> = new MatTableDataSource();

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  abstract getService(): BaseService<T>;

  abstract getToastrService(): ToastrService;

  abstract getSpinnerService(): NgxSpinnerService;

  constructor() {
    // this.tostr = tostr;
    // this.spinner = spinner;
    // this.getSpinnerService().show();
  }

  ngOnInit(): void {
    this.getSpinnerService().show();
  }

  loadData(pageIndex?: number, pageSize?: number, orderBy?: string[]) {

    let search = document.getElementById('search') as HTMLInputElement | null;
    
    let keyword = search?.value.toString() ?? "";

    if (pageIndex == null)
      pageIndex = this.paginator.pageIndex;

    if (pageSize == null)
      pageSize = this.paginator.pageSize;

    new MatTableDataService<T>(this.dataSource)
      .setService(this.getService().search(keyword, pageIndex, pageSize, orderBy))
      .setPaginator(this.paginator)
      .setSort(this.sort)
      .setOnSuccess((response) => { console.log(response); this.getSpinnerService().hide(); })
      .setOnFailure((response) => { console.log(response); this.getToastrService().info('Server error!', 'Cancelled'); })
      .loadData();

  }

  ngAfterViewInit() {
    this.loadData();
  }

  pageChanged(event: PageEvent) {
    this.loadData(event.pageIndex + 1, event.pageSize);
  }

  applyFilter(event: Event) {
    this.loadData();
  }

  sortData(sort: Sort) {
    if (sort.direction !== '')
      this.loadData(this.paginator.pageIndex, this.paginator.pageSize, [sort.active + " " + sort.direction]);
  }

}
