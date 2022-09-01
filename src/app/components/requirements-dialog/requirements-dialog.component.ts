import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { RequirementsDetailService } from 'src/app/shared/requirements/requirements-detail.service';
import { Requirement } from '../../interfaces/model/requirements.model';

@Component({
  selector: 'app-requirements-dialog',
  templateUrl: './requirements-dialog.component.html',
  styleUrls: ['./requirements-dialog.component.scss']
})
export class RequirementsDialogComponent implements OnInit {

  addRequirementRequest: Requirement = {requirementName: ''}
  actionBtn : string = "Save"
  constructor(public dialogRef: MatDialogRef<RequirementsDialogComponent>,
  private tostr : ToastrService,private formBuilder : FormBuilder,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  public service: RequirementsDetailService) {}

  ngOnInit(): void {
  if(this.editData) {
    this.actionBtn = "Update";
    this.addRequirementRequest['id'] = (this.editData.id);
    this.addRequirementRequest['requirementName'] = (this.editData.requirementName);
  }
}

  AddRequirements() {
    if(!this.editData) {
      if(this.addRequirementRequest.requirementName.length != 0) {
        this.service.AddRequirement(this.addRequirementRequest)
        .subscribe({
          next: (requirement) => {
            this.tostr.success('This record has been Saved!','Success');
            this.dialogRef.close('save');      
          },
          error:()=> {
            this.tostr.error('This data is Already Exists!','Duplicate');
          }
        });
      } else {
        this.tostr.error('Please input your prefered requirement!','Empty fields');
      }
      } else {
        this.updateRequirements();
    }
  }

  updateRequirements() {
    this.service.updateRequirementType(this.editData.id,this.addRequirementRequest)
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
