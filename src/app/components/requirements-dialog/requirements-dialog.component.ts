import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { RequirementsDetailService } from 'src/app/shared/requirements/requirements-detail.service';
import { Requirement } from '../../interfaces/model/requirements';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-requirements-dialog',
  templateUrl: './requirements-dialog.component.html',
  styleUrls: ['./requirements-dialog.component.scss']
})
export class RequirementsDialogComponent implements OnInit {

  addRequirementRequest: Requirement = {requirementName: ''}
  submitted: boolean = false;
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

AddRequirements(): void {
  if(!this.editData) {
    if(this.addRequirementRequest.requirementName.length != 0) {
      this.submitted = true;
      this.service.AddRequirement(this.addRequirementRequest)
      .pipe(finalize(() => {
        this.submitted = false;}))
        .subscribe(result => {
              this.tostr.success('This record has been Saved!','Success');
              this.dialogRef.close('save');     
        }),(error) => {
          console.log(error)
        };
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
