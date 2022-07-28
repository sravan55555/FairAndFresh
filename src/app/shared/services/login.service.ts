import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from '../data.service';




declare var require: any
@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService {
  loginBaseApiUrl: string = environment.backendAPI;
  
  userData: any;
  constructor(
    http: HttpClient,

  ) {
    super(http);
  }

  // Fetching headers for http calls
  private get_headers(auth = true) {
    const headers = {};
      headers['Content-Type'] = 'application/json'; 
    return headers;
  }

  getAuthToken(resource) {
    return this.post(this.loginBaseApiUrl+'adminuser/login', resource, this.get_headers());
  }


  getAdminUserEmail(data){
    return this.get(this.loginBaseApiUrl+'adminuser/forgetpassword/'+data.email, this.get_headers());
  }

 
}

