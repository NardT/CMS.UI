import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { VesselDetailService } from 'src/app/shared/vessel/vessel-detail.service';
import { Vessel } from '../../interfaces/model/vessel';

@Component({
  selector: 'app-vesseltype',
  templateUrl: './vesselDialog.component.html',
  styleUrls: ['./vesselDialog.component.scss']
})
export class VesseltypeComponent implements OnInit {

  addVesselRequest: Vessel = {vesselName: ''}
  actionBtn : string = "Save"

  constructor(public dialogRef: MatDialogRef<VesseltypeComponent>,
  private tostr : ToastrService,private formBuilder : FormBuilder,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  public service: VesselDetailService) {}

  ngOnInit(): void {
    if(this.editData) {
      this.actionBtn = "Update";
      this.addVesselRequest['id'] = (this.editData.id);
      this.addVesselRequest['vesselName'] = (this.editData.vesselName);
    }
  }

  AddVessel() {
    if(!this.editData) {
      if(this.addVesselRequest.vesselName.length != 0) {
        this.service.postVessel(this.addVesselRequest)
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
        this.updateVessel();
    }
  }

  updateVessel() {
    this.service.putVesselType(this.editData.id,this.addVesselRequest)
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
