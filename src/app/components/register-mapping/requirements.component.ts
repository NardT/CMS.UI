import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../create-mapping/dialog.component';
import { RequirementmappingDetailService } from 'src/app/shared/requirementmapping/requirementmapping-detail.service';
import { RequirementMapping } from '../create-mapping/requirementmapping.model';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})

export class RequirementsComponent {
  constructor(
      public dialog: MatDialog,
      private tostr : ToastrService,
      private spinner: NgxSpinnerService,
      public service: RequirementmappingDetailService) {}

  mobileMedia1: any = window.matchMedia("(max-width:600px)");
  mobileMedia2: any = window.matchMedia("(max-width:1180px)");
  mobileMedia3: any = window.matchMedia("(max-width:667px)");

  displayedColumns: string[] = ['RequirementMappingPositionName', 'RequirementMappingRequirement','RequirementMappingRequirementType', 'RequirementMappingVesselName', 'RequirementMappingValidityDate', 'action'];
  dataSource = new MatTableDataSource<RequirementMapping>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();});

    this.getAllRequirement();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRequirementDialog() {
    if(this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        width: '100%',
        height: '80%'
    }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.getAllRequirement();
        }});
      } else if (this.mobileMedia2.matches) {
        const dialogRef = this.dialog.open(DialogComponent, {
          disableClose: true,
          width: '70%',
          height: '54%'
        });
      } else if (this.mobileMedia3.matches) {
        const dialogRef = this.dialog.open(DialogComponent, {
          disableClose: true,
          width: '10%',
          height: '10%'
        })
      }
       else {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        width: '77%',
        height: '70%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRequirement();
      }})}
  }

  getAllRequirement() {
      this.service.getAllRequirementMapping()
      .subscribe({
        next:(res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          this.tostr.info('Connection failed, Please report to the admin.','Network issue');
        }
      })
    }

    openRequirementEdit(row : any) {
      const dialogRef = this.dialog.open(DialogComponent, {
        disableClose: true,
        width: '100%',
        height: '70%',
        data:row
      }).afterClosed().subscribe(val => {
        if (val === 'update') {
          this.getAllRequirement();
        }
    })
    }

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
            this.deleteRequirement(id);
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
            this.tostr.info('This record is safe','Cancelled');
          }
      })
    }

    deleteRequirement(id : number) {
      this.service.deleteRequirementMapping(id)
      .subscribe({
        next:(res) => {
          this.tostr.error('This record has been Deleted!','Delete');
          this.getAllRequirement();
        },
        error: ()=> {
          this.tostr.warning('Error while Deleting this record!','Cancelled');
        }
      })
    }


}
