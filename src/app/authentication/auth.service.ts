import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  apiKey = "AIzaSyCzOOEXjBCEMOx6QaZhQInK_D473EOK_f8";
  endpoint: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    this.apiKey;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.endpoint, {
      email,
      password,
      returnSecureToken: true
    });
  }
}
