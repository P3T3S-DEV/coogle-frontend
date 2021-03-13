import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Signup } from 'src/app/models/auth/sign-up.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private readonly baseUrl: string = environment.BASE_API_URL;
  constructor(
    private readonly _http: HttpClient
  ) { }

  public postSignup(username: string, email: string, password: string): Observable<Signup>  {
    let user = {
      username,
      email,
      password
    }
    let body = JSON.stringify(user);
    return this._http.post<Signup>(this.baseUrl + "auth/signup", body, { 'headers': {
      'content-type': 'application/json'
    } }).pipe(
      retry(0),
      catchError(this.handleErrorSignup)
    );
  }

  handleErrorSignup(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.status} web error`;
    } else if (err.status == 400) {
      errorMessage = `Error: ${err.status} user already exists`;
    }
    return throwError(errorMessage);
  }
}
