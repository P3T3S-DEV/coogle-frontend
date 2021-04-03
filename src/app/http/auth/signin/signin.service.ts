import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Signin } from 'src/app/models/auth/sign-in.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  readonly baseUrl: string = environment.BASE_API_URL;
  private headers = { 'content-type': 'application/json' }

  constructor(
    private readonly _http: HttpClient
  ) { }

  public postSignin(username: string, password: string): Observable<Signin> {
    let user = {
      username,
      password
    }
    let body = JSON.stringify(user);
    return this._http.post<Signin>(this.baseUrl + "auth/signin", body, { 'headers': this.headers }).pipe(
      retry(0),
      catchError(this.handleErrorSignin)
    );
  }
  
  handleErrorSignin(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.status} web error`;
    } else {
      switch (err.status) {
        case 404: {
          errorMessage = `Error: ${err.status} - user does not exist `;
          break;
        }
        case 400: {
          errorMessage = `Error: ${err.status} - invalid password`;
          break;
        }
        default:{
          errorMessage = `Error: ${err.status} - invalid request`;
        }
      }
    }
    return throwError(errorMessage);
  }
}
