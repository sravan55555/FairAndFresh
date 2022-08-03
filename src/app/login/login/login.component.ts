import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoginService } from 'src/app/shared/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailReg = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private router: Router ,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.emailForm();
  }

  get f() { return this.loginForm.controls; }


  emailForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.auth.authenticate(this.loginForm.value)
      .subscribe(response => {
        console.log('response',response)
        let data = response
        if (data && data['status']) {
          this.loginService.fairAndFreshLoginStatus.next(true);
          this.toastr.success('login successfully', '', {timeOut: 1000});
          this.router.navigate(['dashboard']);
        } else {
          console.log(data['msg'])
          this.toastr.error(data['msg'], '', {timeOut: 3000});
        }
      });
      
    }
  }

}
