import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const formData = {
      username,
      password,
    };

    return this.http
      .post('http://test-demo.aemenersol.com/api/account/login', formData)
      .pipe(
        tap((response: any) => {
          const token = response.token; // Assuming the response contains a 'token' field
          localStorage.setItem('token', token);
          this.tokenSubject.next(token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
