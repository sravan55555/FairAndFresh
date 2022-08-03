import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoginStatus: boolean = false;
  title = 'FairAndFresh';

  constructor(
    private loginService: LoginService,
  ) {

    this.loginService.fairAndFreshLoginStatus.subscribe(resp => {
      console.log('fairAndFreshLoginStatus', resp)
      this.isLoginStatus = resp;
    })

  }

  ngOnInit(): void {
    let fairAndFreshToken = localStorage.getItem('token');
    this.isLoginStatus = !!fairAndFreshToken ? true : false;
  }

  

}
