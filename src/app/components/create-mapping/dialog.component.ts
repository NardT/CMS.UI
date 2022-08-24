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
import { Position } from '../positiontype/positiontype.model';
import { Vessel } from '../vesseltype/vesseltype.model';
import { RequirementType } from '../requirementstype/requirementType.model';
import { Requirement } from '../requirements-dialog/requirements.model';
import { RequirementMapping } from './requirementmapping.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    addRequirementMappingRequest: RequirementMapping = {RequirementMappingPositionName: '',RequirementMappingRequirement: '',RequirementMappingRequirementType: '',RequirementMappingVesselName: '',RequirementMappingValidityDate: new Date(Date.now())}
    actionBtn : string = "Save"
    mobileMedia1: any = window.matchMedia("(max-width:600px)")
    positionList: any;
    vesselList: any;
    requirements: any;
    requirementtype: any;

    constructor(private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialog: MatDialog,private tostr : ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    public service: RequirementmappingDetailService) {}

    ngOnInit(): void {
      if(this.editData) {
        this.actionBtn = "Update";
        this.addRequirementMappingRequest['Id'] = (this.editData.id);
        this.addRequirementMappingRequest['RequirementMappingPositionName'] = (this.editData.RequirementMappingPositionName);
        this.addRequirementMappingRequest['RequirementMappingRequirement'] = (this.editData.RequirementMappingRequirement);
        this.addRequirementMappingRequest['RequirementMappingRequirementType'] = (this.editData.RequirementMappingRequirementType);
        this.addRequirementMappingRequest['RequirementMappingVesselName'] = (this.editData.RequirementMappingVesselName);
        this.addRequirementMappingRequest['RequirementMappingValidityDate'] = (this.editData.RequirementMappingValidityDate);
      }

      this.service.getAllPosition().subscribe((data:Position[])=> {
        this.positionList = data;
      });

      this.service.getAllVessel().subscribe((data:Vessel[])=> {
        this.vesselList = data;
      });

      this.service.getAllRequirementType().subscribe((data:RequirementType[])=> {
        this.requirementtype = data;
      });

      this.service.getAllRequirements().subscribe((data:Requirement[])=> {
        this.requirements = data;
      });
    }

    ChangePosition(value) {
      this.addRequirementMappingRequest.RequirementMappingPositionName = value;
    }

    ChangeRequirement(value) {
      this.addRequirementMappingRequest.RequirementMappingRequirement = value;
    }

    ChangeRequirementType(value) {
      this.addRequirementMappingRequest.RequirementMappingRequirementType = value;
    }

    ChangeVessel(value) {
      this.addRequirementMappingRequest.RequirementMappingVesselName = value;
    }

    public onDate(event): void {
      console.log(event);
      this.addRequirementMappingRequest.RequirementMappingValidityDate = event;
    }


    AddRequirementMapping() {
      if(!this.editData) {
        // if(this.addRequirementMappingRequest.MappingPosition.length != 0
        //   && this.addRequirementMappingRequest.MappingRequirement.length != 0
        //   && this.addRequirementMappingRequest.MappingVessel.length != 0
        //   && this.addRequirementMappingRequest.MappingRequirementType.length != 0) {
          this.service.postRequirementMapping(this.addRequirementMappingRequest)
          .subscribe({
            next: (mapping) => {
              console.log(this.addRequirementMappingRequest);
              this.tostr.success('This record has been Saved!','Success');
              this.dialogRef.close('save');      
            },
            error:()=> {
              this.tostr.error('This data is Already Exists!','Duplicate');
            }
          });
        // } else {
        //   this.tostr.error('Please input your prefered vessel!','Empty fields');
        // }
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
    

}
