import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    const url: string = state.url;
    console.debug(`state url ==>${url}`);
    return this.checkLogin(url);
  }

  checkLogin(url: string): UrlTree | boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page and then redirect to the original URL after login
    this.router.navigate(['/login']).then(() => {
      this.router.navigate([this.authService.redirectUrl]);
    });

    return false;
  }
}