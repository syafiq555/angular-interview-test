import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginErrorMessage = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Perform login authentication or other actions
    console.log('Email:', email);
    console.log('Password:', password);

    this.authService.login(email, password).subscribe(
      () => {
        // Do something after successful login (e.g., redirect)
        console.log('Login successful');
      },
      (error) => {
        // Handle error responses (e.g., display error message)
        console.error('Login failed:', error);
        this.loginErrorMessage = error.statusText;
      }
    );
  }
}
