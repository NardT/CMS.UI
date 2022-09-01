import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VesseltypeDetailService } from 'src/app/shared/vesseltype/vesseltype-detail.service';
import { VesselTypes } from '../../vesselTypeDialog/vesselType.Model';
import { VesselTypeDialogComponent } from '../../vesselTypeDialog/vessel-type-dialog.component';


@Component({
  selector: 'app-vessel-type-list',
  templateUrl: './vessel-type-list.component.html',
  styleUrls: ['./vessel-type-list.component.scss']
})
export class VesselTypeListComponent implements OnInit {

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService,public service: VesseltypeDetailService) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  displayedColumns: string[] = ['vesselTypeName','Action'];
  dataSource = new MatTableDataSource<VesselTypes>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {this.getAllVesselType();}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  VesselTypeDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(VesselTypeDialogComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
    }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllVesselType();
        }})
      } else {
      const dialogRef = this.dialog.open(VesselTypeDialogComponent, {
        disableClose: true,
        width: '35%',
        height: '43%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllVesselType();
      }})}
  }

  

  openEdit(row : any) {
    const dialogRef = this.dialog.open(VesselTypeDialogComponent, {
      disableClose: true,
      width: '30%',
      height: '43%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllVesselType();
      }
  })
  }

  getAllVesselType() {
    this.service.getAllVesselType()
      .subscribe({
        next:(res)=> {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: ()=> {
          this.tostr.info('No record found in this page!','Info');
        }
      })
  }

  deleteVesselType(id : number) {
    this.service.deleteVesselType(id)
    .subscribe({
      next:(res) => {
        this.tostr.error('This record has been Deleted!','Delete');
        this.getAllVesselType();
      },
      error: ()=> {
        this.tostr.info('Error while Deleting this record!','Cancelled');
      }
    })
  }

  openDelete(id : number) {
    Swal.fire({
        title: 'Are you sure to Remove?',
        text: 'This record will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it',
        cancelButtonText: 'No Keep it',
        allowOutsideClick: false
    }).then((result) => {
        if (result.value) {
          this.deleteVesselType(id);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
        }});}



}
