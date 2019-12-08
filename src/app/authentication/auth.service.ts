import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  apiKey = 'AIzaSyCzOOEXjBCEMOx6QaZhQInK_D473EOK_f8';
  constructor(private http: HttpClient, private router: Router) {}
  user = new BehaviorSubject<User>(null);
  private tokenExpiratonTimer: any;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuth(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuth(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessege = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessege);
    }
    const message = errorResponse.error.error.message;
    switch (message) {
      case 'OPERATION_NOT_ALLOWED':
        errorMessege = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessege =
          'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_EXISTS':
        errorMessege = 'The email address is already in use by another account';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessege =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessege =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessege =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessege);
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpiratonTimer) {
      clearTimeout(this.tokenExpiratonTimer);
    }
    this.tokenExpiratonTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpiratonTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const localData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!localData) {
      console.log('no');
      return;
    }
    const loadedUser = new User(
      localData.email,
      localData.id,
      localData._token,
      new Date(localData._tokenExpirationDate)
    );

    console.log(loadedUser);
    console.log('yes');
    if (loadedUser.token) {
      this.user.next(loadedUser);
      console.log(new Date(localData._tokenExpirationDate).getTime());
      const duration =
        new Date(localData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(duration);
    }
  }
}
