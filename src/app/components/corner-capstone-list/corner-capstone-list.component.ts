import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatTableDataSource} from '@angular/material/table';
import { CornerandcapstoneDialogComponent } from '../cornerandcapstone-dialog/cornerandcapstone-dialog.component';
import { CornerandcapstoneAddingService } from 'src/app/shared/cornerandcapstone-adding/cornerandcapstone-adding.service';
import { Training } from '../cornerandcapstone-dialog/training.model';

@Component({
  selector: 'app-corner-capstone-list',
  templateUrl: './corner-capstone-list.component.html',
  styleUrls: ['./corner-capstone-list.component.scss']
})
export class CornerCapstoneListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    private service: CornerandcapstoneAddingService) {
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }

    mobileMedia1: any = window.matchMedia("(max-width:600px)")
    displayedColumns: string[] = ['trainingName','action'];
    dataSource = new MatTableDataSource<Training>;
    
  ngOnInit(): void {
    this.getAllDetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCornerDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(CornerandcapstoneDialogComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllDetails();
        }})
    } else {
      const dialogRef = this.dialog.open(CornerandcapstoneDialogComponent, {
        disableClose: true,
        width: '35%',
        height: '43%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllDetails();
      }})}
  }

  openCornerEdit(row : any) {
    const dialogRef = this.dialog.open(CornerandcapstoneDialogComponent, {
      disableClose: true,
      width: '30%',
      height: '43%',
      data:row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllDetails();
      }
  })}

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
          this.openCornerDelete(id);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.info('This record is safe','Cancelled');
        }
    })
  }

  openCornerDelete(id : number) {
    this.service.deleteDetails(id)
    .subscribe({
      next:(res) => {
        this.tostr.error('This record has been Deleted!','Delete');
        this.getAllDetails();
      },
      error: ()=> {
        this.tostr.info('Error while Deleting this record!','Cancelled');
      }
    })
  }

  getAllDetails() {
    this.service.getAllDetails()
    .subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.tostr.info('No record found in this page!','Info');
      }
    })
  }






}
