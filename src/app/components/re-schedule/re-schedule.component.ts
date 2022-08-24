import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-re-schedule',
  templateUrl: './re-schedule.component.html',
  styleUrls: ['./re-schedule.component.scss']
})

export class ReScheduleComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  CloseDialog() {
    this.dialog.closeAll();
  }
}
