import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { RequirementDetailService } from 'src/app/shared/requirementType/requirement-detail.service';
import { RequirementType } from './requirementType.model';

@Component({
  selector: 'app-requirementstype',
  templateUrl: './requirementstype.component.html',
  styleUrls: ['./requirementstype.component.scss']
})
export class RequirementstypeComponent {

  addRequirementType: RequirementType = {requirementTypeName: ''}
  actionBtn : string = "Save"
  constructor(public dialogRef: MatDialogRef<RequirementstypeComponent>,
  private tostr : ToastrService,private formBuilder : FormBuilder,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  public service: RequirementDetailService) {}

  ngOnInit(): void {
  if(this.editData) {
    this.actionBtn = "Update";
    this.addRequirementType['id'] = (this.editData.id);
    this.addRequirementType['requirementTypeName'] = (this.editData.requirementTypeName);
  }
}

AddRequirementType() {
  if(!this.editData) {
    if(this.addRequirementType.requirementTypeName.length != 0) {
      this.service.postRequirementType(this.addRequirementType)
      .subscribe({
        next: (requirementType) => {
          this.tostr.success('This record has been Saved!','Success');
          this.dialogRef.close('save');      
        },
        error:()=> {
          this.tostr.error('This data is Already Exists!','Duplicate');
        }
      });
    } else {
      this.tostr.error('Please input your prefered requirement type!','Empty fields');
    }
    } else {
      this.updateRequirementType();
  }
}

updateRequirementType() {
  this.service.putRequirementType(this.editData.id,this.addRequirementType)
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


