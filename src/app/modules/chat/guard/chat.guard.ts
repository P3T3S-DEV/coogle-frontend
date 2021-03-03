import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateTokenService } from 'src/app/http/auth/validate/signin.service';
import { ValidateToken } from 'src/app/models/auth/validate-token.model'

import { catchError, map } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate{

  private token: string | null = localStorage.getItem('token');
  private user: string | null = localStorage.getItem('username');

  constructor(
    private router: Router,
    private _validateTokenService: ValidateTokenService){}
    
    /* Manage error in bad request*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.token != null){
        return this._validateTokenService.getValidation().pipe(map((user: ValidateToken)=>{
        if(this.user != user.username){
          this.router.navigateByUrl('/auth/signin');
          return false;
        }else{
          return true;
        }
      }));
      }else{
        this.router.navigateByUrl('/auth/signin');
          return false;
      } 
  }
}