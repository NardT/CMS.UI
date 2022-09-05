import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard.component';
import { RequirementsComponent } from '../register-mapping/requirements.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from 'src/app/components/dashboard-header/header.component';
import { SchedulingComponent } from '../scheduling/scheduling.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReportsComponent } from '../reports/reports.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomeComponent } from '../dashboard-home/home.component';
import { RequirementComponent} from '../requirements-type/requirement.component';
import { VesselComponent } from '../vessel/vessel.component';
import { VesseltypeComponent } from '../vesselDialog/vesselDialog.component';
import { DialogComponent } from '../create-mapping/dialog.component';
import { PositionComponent } from '../position/position.component';
import { PositionDialogComponent } from '../positionDialog/positionDialog.component';
import { RegisterschedulingComponent } from '../corner-stone-capstone-register/registerscheduling.component';
import { RequirementstypeComponent } from '../requirementstype/requirementstype.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'
import { RequirementsmappingComponent } from '../requirements-mapping/requirementsmapping.component';
import { ViewparticipantsComponent } from '../viewparticipants/viewparticipants.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarComponent } from '../calendar/calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { RequirementMatrixComponent } from '../requirement-matrix/requirement-matrix.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CornerCapstoneListComponent } from '../corner-capstone-list/corner-capstone-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { AuthService } from 'src/app/shared/Authentication/auth.service';
import { VesselTypeListComponent } from '../vesselType-list/vessel-type-list/vessel-type-list.component';

const routes:Routes=[
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "calendar",
        component: CalendarComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "trainingandpromotions",
        component: RequirementsComponent
      },
      {
        path: "dialog",
        component: DialogComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "schedule",
        component: SchedulingComponent
      },
      {
        path: 'ViewParticipants',
        component: ViewparticipantsComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "reports",
        component: ReportsComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "requirementtype",
        component: RequirementComponent
      },
      {
        path: 'requirementsType',
        component: RequirementstypeComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "position",
        component: PositionComponent
      },
      {
        path: 'positiontype',
        component: PositionDialogComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "vessel",
        component: VesselComponent
      },
      {
        path: 'vesseltype',
        component: VesseltypeComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "requirements-mapping",
        component: RequirementsmappingComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "corner-and-capstone",
        // component: CornerCapstoneListComponent
       component: RegisterschedulingComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "corner-and-capstone-register",
        component: CornerCapstoneListComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "requirement-type-list",
        component: RequirementComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "requirement-mapping",
        component: RequirementsComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "requirements",
        component: RequirementMatrixComponent
      }
    ]
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "vesselType",
        component: VesselTypeListComponent
      }
    ]
  }
]

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [DashboardComponent,RequirementsComponent, HeaderComponent, SchedulingComponent,ReportsComponent],
  providers: [
    { provide:HTTP_INTERCEPTORS,useClass:AuthService,multi:true},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-fussion' }),
    FullCalendarModule,
    HttpClientModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule
  ]
})
export class DashboardModule {}
