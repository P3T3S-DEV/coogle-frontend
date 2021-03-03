import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidateToken } from 'src/app/models/auth/validate-token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenService {
  readonly baseUrl: string = environment.BASE_API_URL;
  private headers = { 
    'content-type': 'application/json',
    'authorization': `${localStorage.getItem('token')}`
  } 

  constructor(
    private readonly _http: HttpClient
  ) { }

  public getValidation(): Observable<ValidateToken>{
    return this._http.get<ValidateToken>(this.baseUrl + "auth/validate", {'headers': this.headers});
  }
}
