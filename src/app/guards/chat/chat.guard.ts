import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ValidateTokenService } from 'src/app/http/auth/validate/signin.service';

import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  private token: string;

  constructor(
    private router: Router,
    private _validateTokenService: ValidateTokenService) {
    let token = localStorage.getItem('token');
    if (token != null && token != "") {
      this.token = token;
    } else {
      this.token = "";
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._validateTokenService.getValidation(this.token).pipe(map((response) => {
      if (response) {
        return true;
      }
      this.router.navigate(['/auth/signin']);
      return false;
    }), catchError((error) => {
      this.router.navigate(['/auth/signin']);
      return of(false);
    }));
  }
}