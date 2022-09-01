import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Appconfig } from 'src/app/config/app-config';
import { LoginDetailService } from '../login/login-detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginDetailService,private router: Router,private cnfgsrvc: Appconfig) {}
  canActivate() {
    if(this.service.isLogged()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
