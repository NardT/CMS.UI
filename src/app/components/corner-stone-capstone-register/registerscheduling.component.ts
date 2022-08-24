import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CornerandcapstoneAddingService } from 'src/app/shared/cornerandcapstone-adding/cornerandcapstone-adding.service';
import { CornerCapstoneDetailService } from 'src/app/shared/cornerAndcapstone-schedule/corner-capstone-detail.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-registerscheduling',
  templateUrl: './registerscheduling.component.html',
  styleUrls: ['./registerscheduling.component.scss'],
})

export class RegisterschedulingComponent implements OnInit {

  minDate = new Date();
  addDay = new Date();
  mappingForm : FormGroup;
  cornerandcapstoneList: any;

  constructor(private formBuilder : FormBuilder,
    public dialog: MatDialog,
    private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    public service: CornerCapstoneDetailService,
    public httplist : CornerandcapstoneAddingService
  ) {}


  ngOnInit(): void {
    this.httplist.getAllCornerandCapstone().subscribe((data:any)=> {
      this.cornerandcapstoneList = data;
    });
    this.buildForm();
  }

  buildForm(): void {
    this.mappingForm = this.formBuilder.group({
      title:['',Validators.required],
      date:['',Validators.required],
      maxparticipants:['',Validators.required]
  });
  }

  AddCornerCapstone() {
    if(this.mappingForm.valid) {
      this.service.postDetails(this.mappingForm.value)
      .subscribe({
        next:(res)=> {
          this.mappingForm.reset();
          this.tostr.success('This record has been Saved!','Success');
        },
        error:()=> {
          this.tostr.error('This transaction is Cancelled!','Cancelled');
        }
      });
    }
  }
}
