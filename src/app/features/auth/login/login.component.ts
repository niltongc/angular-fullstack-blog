import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.models';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookingService: CookieService,
    private router: Router
  ){
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(){
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {

        //set auth cookie
        this.cookingService.set('Authorization', `Bearer ${response.token}`, 
          undefined, '/', undefined, true, 'Strict')

          this.authService.setUser({
            email: response.email,
            roles: response.roles
          })

          this.router.navigateByUrl('/')
      }

    })
  }
}
