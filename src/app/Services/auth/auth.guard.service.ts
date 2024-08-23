

// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const token = this.authService.getToken();
//     if (!token) {
//       this.router.navigate(['/login'], { queryParams: { returnUrl: route.url } });
//       return false;
//     }

//     if (this.authService.isTokenExpired(token)) {
//       this.authService.logout();
//       this.router.navigate(['/login'], { queryParams: { returnUrl: route.url } });
//       return false;
//     }

//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const token = this.authService.getToken();
      if (!token || typeof token !== 'string') {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      if (this.authService.isTokenExpired(token)) {
        this.authService.logout();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      return false;
    }
  }
}