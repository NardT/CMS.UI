import { Component, EventEmitter, OnInit, Output, ViewChild, HostListener } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Appconfig } from 'src/app/config/app-config';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenavModule;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubmenuReg: boolean = false;
  showSubmenuReports: boolean = false;
  showSubmenuMaintenance: boolean = false;
  public name:any;
  public href: string = "";
  constructor(private router: Router,private cnfg: Appconfig) {}
  
  ngOnInit(): void {
    this.href = this.router.url;
    this.name = "";
    if (this.href == this.cnfg.TITLErequirementsType) {
      this.name = "";
      this.name = "Requirement Type";
    }
    else if (this.href == this.cnfg.TITLErequirement) {
      this.name = "";
      this.name = "Requirement";
    } else if (this.href == this.cnfg.TITLEposition) {
      this.name = "";
      this.name = "Position";
    } else if (this.href == this.cnfg.TITLEvessel) {
      this.name = "";
      this.name = "Vessel";
    } else if (this.href == this.cnfg.TITLEvesseltype) {
      this.name = "";
      this.name = "Vessel Type";
    } else if (this.href == this.cnfg.TITLEcornerandcapstone) {
      this.name = "";
      this.name = "Training";
    } else if (this.href == this.cnfg.TITLEcalendar) {
      this.name = "";
      this.name = "Calendar and Events";
    } else if (this.href == this.cnfg.TITLErequirementmapping) {
      this.name = "";
      this.name = "Requirement Mapping";
    } 
  }


}
  


