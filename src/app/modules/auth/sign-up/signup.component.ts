import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninService } from 'src/app/http/auth/signin/signin.service';
import { SignupService } from 'src/app/http/auth/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ]),
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40)
    ]),
    repassword: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40)
    ]),
  });

  public errorMessage: string;
  public hasError: boolean; 

  constructor(
    private _signupService: SignupService
  ) { 
    this.errorMessage = "";
    this.hasError = false;
  }

  ngOnInit(): void {
  }

  get getInputUsername() {
    return this.signupForm.get('username');
  }
  
  get getInputEmail(){
    return this.signupForm.get('email');
  }

  get getInputPassword(){
    return this.signupForm.get('password');
  }

  get getInputRepeatPassword(){
    return this.signupForm.get('repassword')
  }

  sendSignup(){
    if (this.getInputPassword?.value == this.getInputRepeatPassword?.value){
      this._signupService.postSignup(
        this.getInputUsername?.value,
        this.getInputEmail?.value,
        this.getInputPassword?.value,
      ).subscribe(
        data => {
          console.log(data);
        },
        error => {
          this.hasError = true;
          this.errorMessage = error;
          console.log(error);
        })
    }else{
      this.hasError = true;
      this.errorMessage = "passwords don't ​match"
    }
  }

  timing() {
    setTimeout(() => this.hasError = false, 5000);
  }
}
