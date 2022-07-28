import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  format_response(response: any) {
    if (!response) {
      return;
    } else if ('success' in response) {
      if (response['success']) {
        return response['data'] || response;
      } else if ('error' in response) {
        return response['error'] || response;
      }
    }
    return response;
  }

  private handleError(error) {
    // return Promise.resolve(error);
    return throwError(error.mess || "server")
  }

  getAll(url: any, headers: any) {
    return this.httpClient.get(url, { headers: headers })
      .pipe(map(response => this.format_response(response)), catchError(this.handleError));
  }

  delete(url: any, headers: any) {
    return this.httpClient.delete(url, { headers: headers })
      .pipe(map(response => this.format_response(response)), catchError(this.handleError));
  }

  post(url: any, resources: any, headers: any) {
    console.log(url,resources,headers)
    return this.httpClient.post(url, resources, headers)
      .pipe(map(response => this.format_response(response)), catchError(this.handleError));
  }

  get(url: any, headers: any) {
    return this.httpClient.get(url, { headers: headers })
      .pipe(map(response => this.format_response(response)), catchError(this.handleError));
  }


}