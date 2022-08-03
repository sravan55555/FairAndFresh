import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarStatus: boolean = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService, ) { }

  ngOnInit(): void {
  }

  onClickSideBar() {
    this.isSidebarStatus = !this.isSidebarStatus;
  }

  logout(){
    localStorage.clear();
    this.loginService.fairAndFreshLoginStatus.next(false);
    this.toastr.success('Logout Sucessfully', '', {timeOut: 1000});
    this.router.navigate(['login']);
    
  }

}
