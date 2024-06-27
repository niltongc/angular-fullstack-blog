import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService){
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(){
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        console.log(this.model)
      }
    })
  }
}
