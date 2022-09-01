import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LoginDetailService } from 'src/app/shared/login/login-detail.service';
import { Router } from '@angular/router';
import { Appconfig } from 'src/app/config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  LoginForm: FormGroup;
  responseData: any;
  constructor(private formBuilder : FormBuilder,private tostr : ToastrService,private router: Router,public service : LoginDetailService,private cnfgsrvc: Appconfig) {}

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      Email : ['',Validators.required],
      Password : ['',Validators.required],
  });
  }

  SubmitCredentials() {
    if(this.LoginForm.valid) {
      this.service.proceedLogin(this.LoginForm.value).subscribe(result => {
        if(result != null) {
          this.responseData = result;
          localStorage.setItem('token',this.responseData.token);
          localStorage.setItem('refreshToken',this.responseData.refreshToken);
          localStorage.setItem('refreshTokenExpiryTime',this.responseData.refreshTokenExpiryTime);
          this.router.navigate([this.cnfgsrvc.homeEndPoint]);
          this.tostr.info('Successfully Logged In!','Welcome!');
        }
      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
