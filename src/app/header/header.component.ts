import { Subscription } from 'rxjs';
import { AuthService } from './../authentication/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
