import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from 'jwt-decode';

export const AuthGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authServices = inject(AuthService);
  const router = inject(Router);
  const user = authServices.getUser();

  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer ', '')
    const decodedToken: any = jwtDecode(token);
    
    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if(expirationDate < currentTime){
      authServices.logout();
      return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
    } else {
      if(user.roles.includes('Writer')){
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }

  } else {
    authServices.logout();
    return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
  }
};
