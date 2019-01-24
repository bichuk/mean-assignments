import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AppError } from '../models/app.error';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServerConfig } from '../common/enpoint-config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server = new ServerConfig();
  appError: AppError = new AppError();
  isLoggedIn: boolean = false;
  userProfile: User = new User();

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User | AppError> {
    return this.http.post<User>(this.server.url + `/user/login`, user, httpOptions)
      .pipe(
        map(res => {   
          this.isLoggedIn = true;    
          this.userProfile = res;   
          return res;
        }),
        catchError(err => this.appError.handleError(err))
      );
  }
}
