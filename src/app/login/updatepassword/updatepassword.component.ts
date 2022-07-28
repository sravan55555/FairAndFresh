import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/login.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;
  submitted = false;
  userId: null;
  authUser:boolean;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      this.VerifyId(params.id);
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }


  get f() { return this.updatePasswordForm.controls; }


  VerifyId(id) {
    this.loginService.getUserData({ userId: id }).subscribe(resp => {
      this.authUser = resp['status'];
    })
  }


  updateForm() {
    this.updatePasswordForm = this.fb.group(
      {
        id: [this.userId],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }


  onSubmit() {
    this.submitted = true;
    if (this.updatePasswordForm.invalid) {
      return;
    }
    if (this.updatePasswordForm.valid) {
      this.loginService.updateUser({userId:this.userId,password:this.updatePasswordForm.value}).subscribe(resp =>{
      let data = resp;
      if (data && data['status']) {
        this.toastr.success('Updated successfully', '', {timeOut: 1000});
        this.router.navigate(['login']);
      } else {
        console.log(data['msg'])
        this.toastr.error(data['msg'], '', {timeOut: 3000});
      }
    })
    }
  }

}
