import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { FormGroup } from "@angular/forms";
import { SignupParams } from './interfaces/signup.interfaces'; // Import the SignupParams interface

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

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  checkLoggedIn() {
    console.log(`localStorage Token: ${localStorage.getItem('token')}`);
    return localStorage.getItem('token') != null;
  }

  loginUser(luInput: any): Observable<any> {
    this.log(`LOGIN INPUT ==> ${JSON.stringify(luInput)}`);
    return this.httpClient.post(`${this.asURL}/auth/login`, luInput)
      .pipe(
        tap((luRes) => {
          this.log(`LOGIN USER => ${JSON.stringify(luRes)}`);
          this.isLoggedIn = true;
        }),
        catchError(this.handleError('LOGIN', []))
      );
  }


  registerUserOld(ruInput: any): Observable<any> {
    this.log(`LOGIN INPUT ==> ${JSON.stringify(ruInput)}`);

    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    const jsonData = JSON.stringify(ruInput.value, getCircularReplacer());

    return this.httpClient
      .post<any>(`${this.asURL}/auth/register`, jsonData)
      .pipe(
        tap((ruRes) => {
          this.log(`RESGISTER USER => ${JSON.stringify(jsonData)}`);
        }),
        catchError(this.handleError('REGISTER USER', []))
      )
  }

  registerUser(signupParams: SignupParams): Observable<any> {
    return this.httpClient
      .post(`${this.asURL}/auth/register`, signupParams);22222222222222222
  }
  
  public findAllRegisteredUsers(): Observable<any> {
    return this.httpClient.get(`${this.asURL}/auth/users`)
      .pipe(
        tap(_ => this.log(`AuthService: users >>>>`)),
        catchError(this.handleError('USERS', []))
      );
  }

  public getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(`${this.asURL}/profile/${userId}`)
      .pipe(
        tap((userRes) => this.log(`USER PROFILE ${userRes}`)),
        catchError(this.handleError('PROFILE', []))
      );
  }

  public removeUser(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.asURL}/auth/remove/${userId}`)
      .pipe(
        tap((rRes) => this.log(`AuthService: user deleted successfully ..`)),
        catchError(this.handleError('DELETE USER', []))
      );
  }

  isTokenExpired(token: string): boolean {
    // Implement your token expiration logic here
    // For example, you could check the token's expiration date
    const expirationDate = JSON.parse(atob(token.split('.')[1])).exp;
    return expirationDate < Date.now() / 1000;
  }

  public logout() {
    console.log('...bye bye');
    localStorage.clear();
    // this.router.navigate (['/auth/login']);
  }

  public storeUserToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public storeUserDataInLocalStorage(user: unknown): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public storeUserData(token: string, user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserInLocalStorage(): any | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeToken(): any {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
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
