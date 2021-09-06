import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface User {
  tax_code: number,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {

  loginUrl = 'https://uatecontractapp.efy.com.vn/api/login';
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  loginAuthencation(tax_code: string, username: string, password: string) {
    let postData = { tax_code: tax_code, username: username, password: password };
    return this.http.post<User>(this.loginUrl, postData)
      .pipe(map(user => {
        if (JSON.parse(JSON.stringify(user)).status == "success") {
          // console.log(JSON.stringify(user));
          // localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        } else {
          localStorage.removeItem('currentUser');
          console.log(JSON.stringify(user));
          return null;
        }
      }),
        catchError(this.handleError)
      );
  }

  isLoggedInSuccess() {
    if (localStorage.getItem('currentUser') != null) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
