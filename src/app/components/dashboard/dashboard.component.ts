import { Component, EventEmitter, OnInit, Output, ViewChild, HostListener } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';


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

  constructor() { 
    // this.sidenav = [];
  }
  
  ngOnInit(): void {}

}
  


