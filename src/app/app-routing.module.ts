import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequirementsComponent } from './components/register-mapping/requirements.component';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { HomeComponent } from './components/dashboard-home/home.component';
import { AuthGuard } from './shared/Authentication/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren:()=>import("./components/dashboard/dashboard.module").then(m=>DashboardModule),canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,SchedulingComponent,ReportsComponent,RequirementsComponent]
