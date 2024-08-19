import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: { 'Content-Type': 'application/json' }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event;
        }
        return event;
      }),
      catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        if (error.status === 400) {
          console.error(error.error);
        }
        return throwError(() => error);
      })
    );
    
  }
  

}
