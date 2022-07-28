import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {


  forgetForm: FormGroup;
  emailReg = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.emailForm();
  }

  get f() { return this.forgetForm.controls; }


  emailForm() {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    })
  }


  onSubmit() {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      return;
    }
    if (this.forgetForm.valid) {
      this.loginService.getAdminUserEmail(this.forgetForm.value).subscribe(resp => {
        let data = resp;
        if (data && data['status']) {
          this.router.navigate(['login/updatepassword',data['userDetails']._id]);
        } else {
          console.log(data['msg'])
          this.toastr.error(data['msg'], '', { timeOut: 3000 });
        }
      })

    }
  }


}
