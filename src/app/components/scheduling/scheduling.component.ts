import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

export interface CornerCapstone {
  cornercapstone: string;
  date: string;
  // participants: string;
  status: string;
}

const ELEMENT_DATA: CornerCapstone[] = [
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'},
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'},
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'},
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'},
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'},
  {cornercapstone: 'Shiphandling and Manuevering',date: 'July 17, 2022',status: 'Open'}
];

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

  }

  displayedColumns: string[] = ['cornercapstone','date', 'participants', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  openDelete() {
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
          this.tostr.success('This record has been Removed','Deleted');
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          this.tostr.error('This record is safe','Cancelled');
        }
    })
  }

}
