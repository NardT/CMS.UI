import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CornerandcapstoneAddingService } from 'src/app/shared/cornerandcapstone-adding/cornerandcapstone-adding.service';
import { Training } from '../../interfaces/model/training';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-cornerandcapstone-dialog',
  templateUrl: './cornerandcapstone-dialog.component.html',
  styleUrls: ['./cornerandcapstone-dialog.component.scss']
})
export class CornerandcapstoneDialogComponent implements OnInit {

  addTrainingRequest: Training = {trainingName: ''} 

  actionBtn : string = "Save"
  submitted: boolean = false;
  constructor(public dialogRef: MatDialogRef<CornerandcapstoneDialogComponent>,
  private tostr : ToastrService,private formBuilder : FormBuilder,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  public service: CornerandcapstoneAddingService) {}

  ngOnInit(): void {
  if(this.editData) {
    this.actionBtn = "Update";
    this.addTrainingRequest['id'] = (this.editData.id);
    this.addTrainingRequest['trainingName'] = (this.editData.trainingName);
  }}


  AddCornerandCapstone() {
    if(!this.editData) {
      if(this.addTrainingRequest.trainingName.length != 0) {
        this.submitted = true;
        this.service.postDetails(this.addTrainingRequest)
        .pipe(finalize(() => {
          this.submitted = false;}))
          .subscribe(result => {
                this.tostr.success('This record has been Saved!','Success');
                this.dialogRef.close('save');     
          });
      } else {
        this.tostr.error('Please input your prefered position!','Empty fields');
      }
      } else {
      this.updateCornerandCapstone();
    }
  }

  updateCornerandCapstone() {
    this.service.putTrainingDetails(this.editData.id,this.addTrainingRequest)
    .subscribe({
      next:(res)=> {
        this.tostr.success('This record has been Updated!','Update');
        this.dialogRef.close('update');
    },
    error:() => {
      this.tostr.error('Error while updating the record!','Cancelled');
    }
  })}


}
