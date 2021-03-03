import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/http/auth/signin/signin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent{
  
   signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private _signinService: SigninService,
    private router: Router
  ) { }

  /*manage on error request */
  sendSignin(){
    this._signinService.postSignin(
      this.signinForm.get('username')?.value,
      this.signinForm.get('password')?.value,
    ).subscribe(data =>{
      localStorage.setItem('username', this.signinForm.get('username')?.value);
      localStorage.setItem('token', data.token);
       this.router.navigateByUrl('/chat');
    });
  }
}
