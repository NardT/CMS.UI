import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { VesseltypeComponent } from '../vesselDialog/vesselDialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { VesselDetailService } from 'src/app/shared/vessel/vessel-detail.service';
import { Vessel } from '../../interfaces/model/vessel';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService,public service: VesselDetailService) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  displayedColumns: string[] = ['vesselName','Action'];
  dataSource = new MatTableDataSource<Vessel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
     this.getAllVessel();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  VesselDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(VesseltypeComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
    }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllVessel();
        }})
      } else {
      const dialogRef = this.dialog.open(VesseltypeComponent, {
        disableClose: true,
        width: '35%',
        height: '43%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllVessel();
      }})}
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
          this.deleteVessel(id);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
        }
    })
  }

  openEdit(row : any) {
    const dialogRef = this.dialog.open(VesseltypeComponent, {
      disableClose: true,
      width: '30%',
      height: '43%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllVessel();
      }
  })
  }

  getAllVessel() {
    this.service.getAllVessel()
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

  deleteVessel(id : number) {
    this.service.deleteVessel(id)
    .subscribe({
      next:(res) => {
        this.tostr.error('This record has been Deleted!','Delete');
        this.getAllVessel();
      },
      error: ()=> {
        this.tostr.info('Error while Deleting this record!','Cancelled');
      }
    })
  }


}
