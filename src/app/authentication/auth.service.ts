import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { User } from "./user.model";

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
  apiKey = "AIzaSyCzOOEXjBCEMOx6QaZhQInK_D473EOK_f8";
  constructor(private http: HttpClient) {}
  user = new Subject<User>();

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
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
    let errorMessege = "An unknown error occured.";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessege);
    }
    const message = errorResponse.error.error.message;
    switch (message) {
      case "OPERATION_NOT_ALLOWED":
        errorMessege = "Password sign-in is disabled for this project";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessege =
          "We have blocked all requests from this device due to unusual activity. Try again later";
        break;
      case "EMAIL_EXISTS":
        errorMessege = "The email address is already in use by another account";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessege =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMessege =
          "The password is invalid or the user does not have a password.";
        break;
      case "USER_DISABLED":
        errorMessege =
          "The user account has been disabled by an administrator.";
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
  }
}
