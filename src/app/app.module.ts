import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MaitenanceComponent } from './components/maitenance/maitenance.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FormsModule} from '@angular/forms';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/create-mapping/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import {MatTreeModule} from '@angular/material/tree';
import { RequirementComponent } from './components/requirements-type/requirement.component';
import { HomeComponent } from './components/dashboard-home/home.component';
import { RequirementstypeComponent } from './components/requirementstype/requirementstype.component';
import { VesselComponent } from './components/vessel/vessel.component';
import { VesseltypeComponent } from './components/vesselDialog/vesselDialog.component';
import { PositionComponent } from './components/position/position.component';
import { PositiontypeComponent } from './components/positionDialog/positionDialog.component';
import { RegisterschedulingComponent } from './components/corner-stone-capstone-register/registerscheduling.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequirementsmappingComponent } from './components/requirements-mapping/requirementsmapping.component';
import { ViewparticipantsComponent } from './components/viewparticipants/viewparticipants.component';
import { ReScheduleComponent } from './components/re-schedule/re-schedule.component';
import { TrainingmatrixComponent } from './components/trainingmatrix/trainingmatrix.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { RequirementMatrixComponent } from './components/requirement-matrix/requirement-matrix.component';
import { RequirementsDialogComponent } from './components/requirements-dialog/requirements-dialog.component';
import { CornerCapstoneListComponent } from './components/corner-capstone-list/corner-capstone-list.component';
import { CornerandcapstoneDialogComponent } from './components/cornerandcapstone-dialog/cornerandcapstone-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';   
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { AuthService } from './shared/Authentication/auth.service';
import { ConfigService } from './config/config-service.service';
import { config } from 'rxjs';
import { Appconfig } from './config/app-config';
import { VesselTypeListComponent } from './components/vesselType-list/vessel-type-list/vessel-type-list.component';
import { VesselTypeDialogComponent } from './components/vesselTypeDialog/vessel-type-dialog.component';
import { AuthGuard } from './shared/Authentication/auth.guard';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

export function initializerFn(configservice: ConfigService) {
  return () => {
    return configservice.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    MaitenanceComponent,
    DialogComponent,
    RequirementComponent,
    HomeComponent,
    RequirementstypeComponent,
    VesselComponent,
    VesseltypeComponent,
    PositionComponent,
    PositiontypeComponent,
    RegisterschedulingComponent,
    RequirementsmappingComponent,
    ViewparticipantsComponent,
    ReScheduleComponent,
    TrainingmatrixComponent,
    CalendarComponent,
    RequirementMatrixComponent,
    RequirementsDialogComponent,
    CornerCapstoneListComponent,
    CornerandcapstoneDialogComponent,
    VesselTypeListComponent,
    VesselTypeDialogComponent
  ],
  providers: [
    AuthGuard,
    { provide:HTTP_INTERCEPTORS,useClass:AuthService,multi:true},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: Appconfig,
      deps: [HttpClient],
      useExisting: ConfigService
    },
    { provide: APP_INITIALIZER, 
      useFactory: initializerFn,
      deps: [ConfigService],
      multi: true
    },
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatBottomSheetModule,
    TextFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    MatTreeModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-fussion' }),
    FullCalendarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
