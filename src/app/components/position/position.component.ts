import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionDetailService } from 'src/app/shared/position/position-detail.service'
import { PositiontypeComponent } from '../positionDialog/positionDialog.component';
import { Position } from '../positionDialog/positiontype.model';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    public service: PositionDetailService
    ) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

  }

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  displayedColumns: string[] = ['positionName','action'];
  dataSource = new MatTableDataSource<Position>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllPosition();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openPositionDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(PositiontypeComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
           this.getAllPosition();
        }})
    } else {
      const dialogRef = this.dialog.open(PositiontypeComponent, {
        disableClose: true,
        width: '35%',
        height: '43%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllPosition();
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
          this.deletePosition(id);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
        }});}

  getAllPosition() {
    this.service.getAllPosition()
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

  openEdit(row : any) {
    console.log(row);
    const dialogRef = this.dialog.open(PositiontypeComponent, {
      disableClose: true,
      width: '30%',
      height: '43%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllPosition();
      }
  })
  }

  deletePosition(id : number) {
    this.service.deletePosition(id)
    .subscribe({
      next:(res) => {
        this.tostr.error('This record has been Deleted!','Delete');
        this.getAllPosition();
      },
      error: ()=> {
        this.tostr.info('Error while Deleting this record!','Cancelled');
      }
    })
  }


}
