import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PositionDialogComponent } from '../positionDialog/positionDialog.component';
import { BaseMatComponent } from 'src/app/shared/common/base-mat.component';
import { BaseService } from 'src/app/interfaces/common/base-service';
import { PositionService } from 'src/app/services/position.service';
import { Position } from 'src/app/interfaces/model/position';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends BaseMatComponent<Position> implements OnInit {

  constructor(public dialog: MatDialog,
    private tostr: ToastrService,
    private spinner: NgxSpinnerService,
    public service: PositionService) {
    super();
  }

  getService(): BaseService<Position> {
    return this.service;
  }

  getToastrService(): ToastrService {
    return this.tostr;
  }

  getSpinnerService(): NgxSpinnerService {
    return this.spinner;
  }

  displayedColumns: string[] = ['positionName', 'action'];

  RefreshButton() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.getService();
  }

  openPositionDialog() {
    if (this.mobileMedia1.matches) {
      const dialogRef = this.dialog.open(PositionDialogComponent, {
        disableClose: true,
        width: '100%',
        height: '45%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.loadData();
        }
      })
    } else {
      const dialogRef = this.dialog.open(PositionDialogComponent, {
        disableClose: true,
        width: '35%',
        height: '33%'
      }).afterClosed().subscribe(val => {
        if (val === 'save') {
          this.loadData();
        }
      })
    }
  }

  openDelete(id: string) {
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
        console.log(id);
        this.deletePosition(id);
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        this.tostr.info('This record is safe', 'Cancelled');
      }
    });
  }

  openEdit(row: Position) {
    console.log(row);
    const dialogRef = this.dialog.open(PositionDialogComponent, {
      disableClose: true,
      width: '35%',
      height: '33%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.loadData();
      }
    })
  }

  deletePosition(id: string) {
    this.service.delete(id)
      .subscribe({
        next: (res) => {
          this.tostr.error('This record has been Deleted!', 'Delete');
          this.loadData();
        },
        error: () => {
          this.tostr.info('Error while Deleting this record!', 'Cancelled');
        }
      })
  }


}
