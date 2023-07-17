import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-interview-test';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.token$.subscribe((o) => {
      if (o) this.navigateToHome();
    });
    if (this.authService.hasToken()) {
      this.navigateToHome();
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
