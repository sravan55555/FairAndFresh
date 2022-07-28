import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, map } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: any;
  // currentRestaurantInfo: any;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private loginService: LoginService,
  ) { }

  // authenticate(credentials) {
  authenticate(credentails) {
    return this.loginService.getAuthToken(credentails)
      .pipe(map(response => {

        // *no jwt token *
        if (response && response['status']) {
          localStorage.setItem('token', response['token'])
          localStorage.setItem('userDetails', JSON.stringify(response['userDetails']))
          return response;
        } else {

          return response;
        }

      }));
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      // return !this.jwt.isTokenExpired(localStorage.getItem('token'));
      return true;
    } else {

      return false;
    }
  }

  /**
   * function to logout the session
   */

  // logoutSeesion() {
  //   localStorage.clear();
  //   this.toastr.success('Logout Sucessfully', '', {timeOut: 1000});
  //   // this.router.navigateByUrl('/login');
  //   this.router.navigate(['login']);
  // }
}
