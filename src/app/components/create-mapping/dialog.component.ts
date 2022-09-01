import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequirementmappingDetailService } from 'src/app/shared/requirementmapping/requirementmapping-detail.service';
import { Vessel } from '../../interfaces/model/vessel';
import { RequirementType } from '../../interfaces/model/requirementType.model';
import { Requirement } from '../../interfaces/model/requirements.model';
import { RequirementMapping } from './requirementmapping.model';
import { VesselTypes } from '../../interfaces/model/vesselType.';
import { RequirementsMappings } from './requirementsmappings.model';
import { Position } from 'src/app/interfaces/model/position';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    actionBtn : string = "Save"
    mobileMedia1: any = window.matchMedia("(max-width:600px)")
    positionList: any;
    vesselList: any;
    requirements: any;
    requirementtype: any;
    editposition: any;
    addRequirementMappingRequest: RequirementsMappings = {PositionId: '',RequirementId: '',RequirementTypeId: '',VesselTypeId: '',ValidityDate: new Date()}
    EditRequirementMappingRequest: RequirementMapping = {positionName: '', requirementName: '', requirementTypeName: '', vesselTypeName: '',validityDate: new Date()}

    constructor(private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog,private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public service: RequirementmappingDetailService) {}

    ngOnInit(): void {
      if(this.editData) {
        console.log(this.editData);
        this.actionBtn = "Update";
        this.EditRequirementMappingRequest['id'] = (this.editData.id);
        this.EditRequirementMappingRequest['positionName'] = (this.editData.positionName);
        this.EditRequirementMappingRequest['requirementName'] = (this.editData.requirementName);
        this.EditRequirementMappingRequest['requirementTypeName'] = (this.editData.requirementTypeName);
        this.EditRequirementMappingRequest['vesselTypeName'] = (this.editData.vesselTypeName);
        this.EditRequirementMappingRequest['validityDate'] = (this.editData.validityDate);
      
       }


      this.service.getAllPosition().subscribe((data:Position[])=> {
          this.positionList = data;
      });

      this.service.getAllVessel().subscribe((data:VesselTypes[])=> {
        this.vesselList = data;
      });

      this.service.getAllRequirementType().subscribe((data:RequirementType[])=> {
        this.requirementtype = data;
      });

      this.service.getAllRequirements().subscribe((data:Requirement[])=> {
        this.requirements = data;
      });

      this.dialogRef.keydownEvents().subscribe(event => {
        if (event.key === "Escape") {
            this.onCancel();
        }});
    }

    ChangePosition(value) {
      this.addRequirementMappingRequest.PositionId = value;
    }

    ChangeRequirement(value) {
      this.addRequirementMappingRequest.RequirementId = value;
    }

    ChangeRequirementType(value) {
      this.addRequirementMappingRequest.RequirementTypeId = value;
    }

    ChangeVessel(value) {
      this.addRequirementMappingRequest.VesselTypeId = value;
    }

    ChangeDate(value) {
      this.addRequirementMappingRequest.ValidityDate = value;
    }

    AddRequirementMapping() {
      if(!this.editData) {
        if(this.addRequirementMappingRequest.PositionId.length != 0) {
          this.service.postRequirementMapping(this.addRequirementMappingRequest)
          .subscribe({
            next: (mapping) => {
              this.tostr.success('This record has been Saved!','Success');
              this.dialogRef.close('save');  
            },
            error:(err)=> {
              console.log(err);
              this.tostr.error('This data is Already Exists!','Duplicate');
            }
          });
        } else {
          this.tostr.error('Please input your prefered vessel!','Empty fields');
        }
        } else {
          this.updateRequirementmapping();
      }
    }

    updateRequirementmapping() {
      this.service.putRequirementMapping(this.editData.id,this.addRequirementMappingRequest)
      .subscribe({
        next:(res)=> {
          this.tostr.success('This record has been Updated!','Update');
          this.dialogRef.close('update');
      },
      error:() => {
        this.tostr.error('Error while updating the record!','Cancelled');
      }
    })}

    onCancel(): void {
      this.editData.cancel = true;
      this.dialogRef.close(this.editData);
  }

    

}
