import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

export interface RequirementsMapping {
  requirement: string;
  processingrequirement: string;
}

const ELEMENT_DATA: RequirementsMapping [] = [
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
  {requirement: 'Basic Training ( BFF, EFA, PST, PSSR ) ( Regulation V1/1 )',processingrequirement: 'Basic Training'},
];

@Component({
  selector: 'app-requirementsmapping',
  templateUrl: './requirementsmapping.component.html',
  styleUrls: ['./requirementsmapping.component.scss']
})
export class RequirementsmappingComponent implements OnInit {

  constructor(public dialog: MatDialog,private tostr : ToastrService,private spinner: NgxSpinnerService) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);

  }

  displayedColumns: string[] = ['Requirement','Processing Requirement'];
  dataSource = ELEMENT_DATA;

  // openDelete() {
  //   Swal.fire({
  //       title: 'Are you sure to Remove?',
  //       text: 'This record will be deleted permanently!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes Delete it',
  //       cancelButtonText: 'No Keep it',
  //       allowOutsideClick: false
  //   }).then((result) => {
  //       if (result.value) {
  //         this.tostr.success('This record has been Removed','Deleted');
  //       }
  //       else if (result.dismiss === Swal.DismissReason.cancel) {
  //         this.tostr.error('This record is safe','Cancelled');
  //       }
  //   })
  // }

  ngOnInit(): void {}

}
