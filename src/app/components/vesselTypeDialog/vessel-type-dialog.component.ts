import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PositionDetailService } from 'src/app/shared/position/position-detail.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { VesselTypes } from './vesselType.Model';
import { VesseltypeDetailService } from 'src/app/shared/vesseltype/vesseltype-detail.service';


@Component({
  selector: 'app-vessel-type-dialog',
  templateUrl: './vessel-type-dialog.component.html',
  styleUrls: ['./vessel-type-dialog.component.scss']
})
export class VesselTypeDialogComponent implements OnInit {


  addVesselTypeRequest: VesselTypes = {vesselTypeName: ''}
  actionBtn = "Save"

  constructor(public dialogRef: MatDialogRef<VesselTypeDialogComponent>,
    private tostr : ToastrService,private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public service: VesseltypeDetailService,
    private http: HttpClient) { }

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.addVesselTypeRequest['id'] = (this.editData.id);
      this.addVesselTypeRequest['vesselTypeName'] = (this.editData.vesselTypeName);
    }

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onCancel();
      }});
  }

  AddVesselType() {
    if(!this.editData) {
      if(this.addVesselTypeRequest.vesselTypeName.length != 0) {
        this.service.postVesselTypes(this.addVesselTypeRequest)
        .subscribe({
          next: (vessel) => {
            this.tostr.success('This record has been Saved!','Success');
            this.dialogRef.close('save');      
          },
          error:()=> {
            this.tostr.error('This data is Already Exists!','Duplicate');
          }
        });
      } else {
        this.tostr.error('Please input your prefered vessel!','Empty fields');
      }
      } else {
        this.updateVesselType();
    }
  }




  updateVesselType() {
    this.service.putVesselType(this.editData.id,this.addVesselTypeRequest)
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

  onCancel(): void {
    this.editData.cancel = true;
    this.dialogRef.close(this.editData);
}

}
