import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/http/auth/signup/signup.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
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

  public modalDisplay: string = "none";
  public username: string = "";
  constructor(
    private _signupService: SignupService
  ) {
    this.modalDisplay = "none";
    this.username = "";
    this.errorMessage = "";
    this.hasError = true;
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
          this.hasError = false;
          this.username = data.username;
          this.openDialog();
        },
        error => {
          this.hasError = true;
          this.errorMessage = error;
          this.openDialog();
        })
    }else{
      this.hasError = true;
      this.errorMessage = "passwords don't ​match";
      this.openDialog();
    }
  }
  
  openDialog() {
    this.modalDisplay = "block"
  }

  closeDialog() {
    this.modalDisplay = "none";
  }
}
