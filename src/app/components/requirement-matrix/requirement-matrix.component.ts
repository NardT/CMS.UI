import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { VesseltypeComponent } from '../vesselDialog/vesselDialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequirementsDialogComponent } from '../requirements-dialog/requirements-dialog.component';
import { RequirementsDetailService } from 'src/app/shared/requirements/requirements-detail.service';
import { Requirement } from '../../interfaces/model/requirements.model';

@Component({
  selector: 'app-requirement-matrix',
  templateUrl: './requirement-matrix.component.html',
  styleUrls: ['./requirement-matrix.component.scss']
})
export class RequirementMatrixComponent implements OnInit {

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService, public service: RequirementsDetailService ) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  displayedColumns: string[] = ['requirementName','Action'];
  dataSource = new MatTableDataSource<Requirement>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getAllRequirement();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  RequirementsDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(RequirementsDialogComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
    }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllRequirement();
        }})
      } else {
      const dialogRef = this.dialog.open(RequirementsDialogComponent, {
        disableClose: true,
        width: '35%',
        height: '43%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRequirement();
      }})}
  }

  openDeleteRequirements(id : number) {
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
          this.deleteRequirements(id);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
        }
    })
  }

  openRequirementsEdit(row : any) {
    const dialogRef = this.dialog.open(RequirementsDialogComponent, {
      disableClose: true,
      width: '30%',
      height: '43%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllRequirement();
      }
  })
  }

  getAllRequirement() {
    this.service.getAllRequirement()
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

  deleteRequirements(id : number) {
    this.service.deleteRequirement(id)
    .subscribe({
      next:(res) => {
        this.tostr.error('This record has been Deleted!','Delete');
        this.getAllRequirement();
      },
      error: ()=> {
        this.tostr.error('Error while Deleting this record!','Cancelled');
      }
    })
  }


}