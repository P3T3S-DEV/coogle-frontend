import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signin } from 'src/app/models/auth/sign-in.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  readonly baseUrl: string = environment.BASE_API_URL;
  private headers = { 'content-type': 'application/json'} 

  constructor(
    private readonly _http: HttpClient
  ) { }

  public postSignin(username: string, password: string): Observable<Signin>{
    let user = {
      username,
      password
    }
    let body = JSON.stringify(user);
    return this._http.post<Signin>(this.baseUrl + "auth/signin", body, {'headers': this.headers});
  }

  public postSignup(username: string, email: string, password: string){
    let user = {
      username,
      email,
      password
    }
    let body = JSON.stringify(user);
    return this._http.post<Signin>(this.baseUrl + "auth/signup", body, {'headers': this.headers});
  }
}
