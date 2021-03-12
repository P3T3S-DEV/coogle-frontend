import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenService {
  readonly baseUrl: string = environment.BASE_API_URL;
  
  constructor(
    private readonly _http: HttpClient
  ) { }

  public getValidation(token: string){
    return this._http.get(this.baseUrl + "auth/validate", {'headers': {
      'content-type': 'application/json',
      'authorization': `${token}`
    }})
    .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  handleError(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.status} web error`;
    } else {
      errorMessage = `Error: ${err.status} server error `;
    }
    return throwError(errorMessage);
  }
}
