import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableModule} from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import { ReScheduleComponent } from '../re-schedule/re-schedule.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatTableDataSource} from '@angular/material/table';

export interface ViewParticipants {
  Crew: string;
  Status: string;
}

const ELEMENT_DATA: ViewParticipants[] = [
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
  {Crew: 'Warren Villafranca',Status: 'Schedule'},
];

@Component({
  selector: 'app-viewparticipants',
  templateUrl: './viewparticipants.component.html',
  styleUrls: ['./viewparticipants.component.scss']
})

export class ViewparticipantsComponent implements OnInit {

  mobileMedia1: any = window.matchMedia("(max-width:600px)")
  mobileMedia2: any = window.matchMedia("(max-width:320px)")
  mobileMedia3: any = window.matchMedia("(max-width:480px)")
  mobileMedia4: any = window.matchMedia("(max-width:801px)")
  mobileMedia5: any = window.matchMedia("(max-width:1025px)")

  displayedColumns: string[] = ['select','crew','status'];
  dataSource = new MatTableDataSource<ViewParticipants>(ELEMENT_DATA);
  selection = new SelectionModel<ViewParticipants>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  } 

  checkboxLabel(row?: ViewParticipants): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Crew + 1}`;
  }

  ngOnInit(): void {}

  openDialog() {
    Swal.fire({
        title: 'Re-schedule?',
        text: 'This crew will create a new schedule!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes resched',
        cancelButtonText: 'No Keep it',
        allowOutsideClick: false
    }).then((result) => {
        if (result.value) {
          if(this.mobileMedia1.matches || this.mobileMedia2.matches || this.mobileMedia3.matches || this.mobileMedia4.matches || this.mobileMedia5.matches)
          {
            const dialogRef = this.dialog.open(ReScheduleComponent, {
              disableClose: true,
              width: '100%',
              height: '60%'
          });
          } else {
            const dialogRef = this.dialog.open(ReScheduleComponent, {
              disableClose: true,
              width: '35%',
              height: '55%'
          });
        }} else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.error('This schedule is safe','Cancelled');
        }
    })
  }

  
}


