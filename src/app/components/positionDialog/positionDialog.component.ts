import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { PositionDetailService } from 'src/app/shared/position/position-detail.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Position } from './positiontype.model';
import { Position } from 'src/app/interfaces/model/position';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { PositionService } from 'src/app/services/position.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-positiontype',
  templateUrl: './positionDialog.component.html',
  styleUrls: ['./positionDialog.component.scss']
})
export class PositionDialogComponent implements OnInit {

  model: Position = { positionName: '', id:'' }
  actionBtn = "Save"
  submitted: boolean = false;

  constructor(public dialogRef: MatDialogRef<PositionDialogComponent>,
    private tostr: ToastrService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public service: PositionService,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Update";
      this.model.id = (this.editData.id);
      this.model.positionName = (this.editData.positionName);
      console.log(this.model);
    }
  }

  addPosition() {
    if (!this.editData) {
      if (this.model.positionName.length != 0) {
        this.submitted = true;
        this.service.add(this.model)
        .pipe(finalize(() => {
          this.submitted = false;}))
          .subscribe(result => {
                this.tostr.success('This record has been Saved!','Success');
                this.dialogRef.close('save');     
          });      
    } 
    } else {
      this.updatePosition();
    }
  }

  updatePosition() {
    console.log(this.editData);
    console.log(this.model);
    this.service.update(this.editData.id, this.model)
      .subscribe({
        next: (res) => {
          this.tostr.success('This record has been Updated!', 'Update');
          this.dialogRef.close('update');
        },
        error: (res) => {
          console.log(res);
          this.tostr.error('Error while updating the record!', 'Cancelled');
        }
      })
  }


}
