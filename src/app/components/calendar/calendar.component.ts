import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog} from '@angular/material/dialog';
import { RegisterschedulingComponent } from '../corner-stone-capstone-register/registerscheduling.component';
import { CornerCapstoneDetailService } from 'src/app/shared/cornerAndcapstone-schedule/corner-capstone-detail.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  title: string;
  Events: any[] = [
    {
      title: '',
      date: '',
      maxparticipants: ''
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    events: this.Events,
    eventTextColor: 'red',
    eventBackgroundColor: 'skyblue',
    contentHeight: 'auto',
    aspectRatio: 2,
    expandRows: false,
    // weekends: false,
    editable: false
  };

  constructor(private spinner: NgxSpinnerService,
    private service: CornerCapstoneDetailService,
    public dialog: MatDialog,
    private tostr : ToastrService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.calendarOptions.footerToolbar = false;}

    ngOnInit(): void {
      setTimeout( function() {
      window.dispatchEvent(new Event('resize'))
      }, 1);

      this.loadEvent();
    }

    openScheduleDialog() {
      //if(this.mobileMedia1.matches) {
        const dialogRef = this.dialog.open(RegisterschedulingComponent, {
          disableClose: true,
          width: '40%',
          height: '75%'
        }).afterClosed().subscribe(val => {
            this.loadEvent();
          })
      }

    loadEvent(): void {
      this.service.getAllDetails().subscribe((data) => {
        this.calendarOptions.events = data.map(
          evt => {
            return { title: evt.title, date: evt.date, maxparticipants: evt.maxparticipants}
      })
    })
  }


}

  


