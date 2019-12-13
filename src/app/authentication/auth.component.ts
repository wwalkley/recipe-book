import { PlaceholderDirective } from './../shared/placeholder.directive';

import { AlertComponent } from './../shared/alert/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFacotryResolver: ComponentFactoryResolver
  ) {}

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let authenticationObservable: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      authenticationObservable = this.authService.logIn(email, password);
    } else {
      this.isLoading = true;
      authenticationObservable = this.authService.signUp(email, password);
    }

    authenticationObservable.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorModal(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onCloseModal() {
    this.error = null;
  }

  private showErrorModal(error: string) {
    const alertFactory = this.componentFacotryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.info = error;

    this.closeSubscription = componentRef.instance.closeModal.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
