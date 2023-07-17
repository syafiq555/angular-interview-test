import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';

import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-interview-test';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.token$.subscribe((token: string | null) => {
      this.handleAuth(token);
    });
    this.handleAuth(this.authService.token);
  }

  private handleAuth(token: string | null = null) {
    if (token) {
      this.isLoggedIn = true;
      this.navigateToHome();
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }
}
