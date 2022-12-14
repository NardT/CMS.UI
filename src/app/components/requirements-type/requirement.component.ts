import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RequirementstypeComponent } from '../requirementstype/requirementstype.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequirementDetailService } from 'src/app/shared/requirementType/requirement-detail.service';
import { RequirementType } from '../../interfaces/model/requirementType';


@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss']
})

export class RequirementComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    public service: RequirementDetailService
    ) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

  }
  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  displayedColumns: string[] = ['requirementTypeName','action'];
  dataSource = new MatTableDataSource<RequirementType>;

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
    }}

  RefreshButton() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.getAllRequirement();
  }

  OpenRequirementDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(RequirementstypeComponent, {
        disableClose: true,
        width: '100%',
        height: '40%'
    }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllRequirement();
        }})
      } else {
      const dialogRef = this.dialog.open(RequirementstypeComponent, {
        disableClose: true,
        width: '35%',
        height: '33%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRequirement();
      }})}}

  openRequirementEdit(row : any) {
    const dialogRef = this.dialog.open(RequirementstypeComponent, {
      disableClose: true,
      width: '35%',
      height: '33%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllRequirement();
    }})}

  getAllRequirement() {
    this.service.getAllRequirementType()
    .subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: ()=> {
        this.tostr.info('No record found in this page!','Info');
    }})}

  openRequirementDelete(id : number) {
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
          this.deleteRequirement(id)
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
    }})}
    
    deleteRequirement(id : number) {
      this.service.deleteRequirementType(id)
      .subscribe({
        next:(res) => {
          this.tostr.error('This record has been Deleted!','Delete');
          this.getAllRequirement();
        },
        error: ()=> {
          this.tostr.info('Error while Deleting this record!','Error');
      }})}
 


}
