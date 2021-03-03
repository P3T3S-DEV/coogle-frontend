import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SigninService } from 'src/app/http/auth/signin/signin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   signinForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
  });
  constructor(
    private _signinService: SigninService
  ) { }

  ngOnInit(): void {
  }

  sendSignup(){
    this._signinService.postSignup(
      this.signinForm.get('username')?.value,
      this.signinForm.get('email')?.value,
      this.signinForm.get('password')?.value,
    ).subscribe(data =>{
      console.log(data);
    })
  }
}
