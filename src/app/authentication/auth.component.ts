import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.isLoginMode) {
    }

    if (!this.isLoginMode) {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;

      this.authService.signUp(email, password).subscribe(
        responseData => {
          this.isLoading = false;
        },
        errorResponse => {
          const message = errorResponse.error.error.message;
          switch (message) {
            case "OPERATION_NOT_ALLOWED":
              this.error = "Password sign-in is disabled for this project";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              this.error =
                "We have blocked all requests from this device due to unusual activity. Try again later";
              break;
            case "EMAIL_EXISTS":
              this.error =
                "The email address is already in use by another account";
              break;
          }
          this.isLoading = false;
        }
      );
      form.reset();
    }
  }
}
