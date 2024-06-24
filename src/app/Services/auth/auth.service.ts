import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private asURL = environment.localServer;
    isLoggedIn = false;
    redirectUrl: string;

    constructor(
        private httpClient: HttpClient
    ) {
    }

    checkLoggedIn() {
        console.log(`localStorage Token: ${localStorage.getItem('token')}`);
        return localStorage.getItem('token') != null;
      }

    loginUser(luInput: any): Observable<any> {
        this.log(`LOGIN INPUT ==> ${JSON.stringify(luInput)}`);
        return this.httpClient.post(`${this.asURL}/`, luInput)
            .pipe(
                tap((luRes) => {
                    this.log(`LOGIN USER => ${JSON.stringify(luRes)}`);
                    this.isLoggedIn = true;
                }),
                catchError(this.handleError('LOGIN', []))
            );
    }


    registerUser(ruInput: any): Observable<any> {
        this.log(`LOGIN INPUT ==> ${JSON.stringify(ruInput)}`);
        return this.httpClient.post<any>(`${this.asURL}/auth/register`, ruInput)
            .pipe(
                tap((ruRes) => {
                    this.log(`RESGISTER USER => ${JSON.stringify(ruRes)}`);
                }),
                catchError(this.handleError('REGISTER USER', []))
            )
    }

    public findAllRegisteredUsers(): Observable<any> {
        return this.httpClient.get(`${this.asURL}/auth/users`)
          .pipe(
            tap(_ => this.log(`AuthService: users >>>>`)),
            catchError(this.handleError('Users', []))
          );
      }
    
      public getUserProfile(userId: string): Observable<any> {
        return this.httpClient.get(`${this.asURL}/profile/${userId}`)
          .pipe(
            tap((userRes) => this.log(`USER PROFILE ${userRes}`)),
            catchError(this.handleError('findUserById', []))
          );
      }
    
      public removeUser(userId: string): Observable<any> {
        return this.httpClient.delete(`${this.asURL}/auth/remove/${userId}`)
          .pipe(
            tap(rRes => this.log(`AuthService: user deleted successfully ..`)),
            catchError(this.handleError('removeUser', []))
          );
      }
    
      public logout() {
        console.log('...bye bye');
        localStorage.clear();
        // this.router.navigate (['/auth/login']);
      }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }

}
