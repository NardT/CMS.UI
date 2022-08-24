import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { LoginDetailService } from 'src/app/shared/login/login-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  LoginForm: FormGroup;
  todaydate = localStorage.getItem("refreshTokenExpiryTime");
  constructor(private formBuilder : FormBuilder,private tostr : ToastrService,private router: Router,public service : LoginDetailService) {}

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      Email : ['',Validators.required],
      Password : ['',Validators.required],
  });
}

  SubmitCredentials() {
    const now = new Date();
    if(this.LoginForm.valid) {
      if(localStorage.length == 0) {
        this.service.postRequestToken(this.LoginForm.value)
          .subscribe({
              next:(res)=> {
                console.log("test1");
                localStorage.setItem('token',res.token);
                localStorage.setItem('refreshToken',res.refreshToken);
                localStorage.setItem('refreshTokenExpiryTime',res.refreshTokenExpiryTime);
                this.LoginForm.reset();
                this.router.navigate(['/home']);},
              error:()=> {
                this.tostr.warning('Log in failed! Check your credentials','Info');
              }});
        } else if (localStorage.length > 0 && this.todaydate == now.toISOString()) {
            if (this.LoginForm.valid) {
              this.service.postRequestToken(this.LoginForm.value)
              .subscribe({
                  next:(res)=> {
                    console.log("test2");
                    localStorage.setItem('token',res.token);
                    localStorage.setItem('refreshToken',res.refreshToken);
                    localStorage.setItem('refreshTokenExpiryTime',res.refreshTokenExpiryTime);
                    this.LoginForm.reset();
                    this.router.navigate(['/home']);},
                  error:()=> {
                    this.tostr.warning('Log in failed! Check your credentials','Info');
                  }});} 
    } else {
      this.service.postRequestToken(this.LoginForm.value)
      .subscribe({
        next:(res)=> {
          console.log("test3");
          localStorage.setItem('token',res.token);
          localStorage.setItem('refreshToken',res.refreshToken);
          localStorage.setItem('refreshTokenExpiryTime',res.refreshTokenExpiryTime);
          this.LoginForm.reset();
          this.router.navigate(['/home']);
          this.tostr.info('Successfully Logged In!','Welcome!');
        },
        error:()=> {
          this.tostr.warning('Connection failed! Please contact the admin','Not connected');
        }
      })
      ;
      ;
    }}
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
