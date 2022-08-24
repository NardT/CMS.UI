import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PositionDetailService } from 'src/app/shared/position/position-detail.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Position } from './positiontype.model';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';

@Component({
  selector: 'app-positiontype',
  templateUrl: './positiontype.component.html',
  styleUrls: ['./positiontype.component.scss']
})
export class PositiontypeComponent implements OnInit {

  addPositionRequest: Position = {positionName: ''}
  actionBtn = "Save"

  constructor(public dialogRef: MatDialogRef<PositiontypeComponent>,
    private tostr : ToastrService,private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public service: PositionDetailService,
    private http: HttpClient) {}

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.addPositionRequest['id'] = (this.editData.id);
      this.addPositionRequest['positionName'] = (this.editData.positionName);
    }
  }

  AddPosition() {
    if(!this.editData) {
    if(this.addPositionRequest.positionName.length != 0) {
      this.service.AddPosition(this.addPositionRequest)
      .subscribe({
        next: (position) => {
          this.tostr.success('This record has been Saved!','Success');
          this.dialogRef.close('save');      
        },
        error:()=> {
          this.tostr.error('This data is Already Exists!','Duplicate');
        }
      });
    } else {
      this.tostr.error('Please input your prefered position!','Empty fields');
    }
    } else {
    this.updatePositionType();
  }
}

updatePositionType() {
  this.service.updatePositionType(this.editData.id,this.addPositionRequest)
    .subscribe({
      next:(res)=> {
        this.tostr.success('This record has been Updated!','Update');
        this.dialogRef.close('update');
    },
    error:() => {
      this.tostr.error('Error while updating the record!','Cancelled');
    }
  })
}


}
