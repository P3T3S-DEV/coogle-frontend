import { Component} from '@angular/core';
import { SigninService } from 'src/app/http/auth/signin/signin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public errorMessage: string;
  public hasError: boolean;
  
  public modalDisplay: string = "none";

  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
  });

  constructor(
    private _signinService: SigninService
  ) { 
    this.errorMessage = "Request error";
    this.hasError = true;
  }
  get getInputUsername() {
    return this.signinForm.get('username');
  }
  get getInputPassword() {
    return this.signinForm.get('password');
  }

  sendSignin() {
    this._signinService.postSignin(
      this.getInputUsername?.value,
      this.getInputPassword?.value,
    ).subscribe(
      data => {
        this.hasError = false;
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('token', data.token);
        this.openDialog();
      },
      error => {
        this.errorMessage = error;
        this.hasError = true;
        this.openDialog();
      });
  }

  openDialog(){
    this.modalDisplay = "block"
  }

  closeDialog(){
    this.modalDisplay = "none";
  }
}
