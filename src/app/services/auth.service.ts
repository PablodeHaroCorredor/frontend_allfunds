// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  isLoggedIn = signal(false);
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      password,
      role,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  saveToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      this.isLoggedIn.set(true);
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      return { username: payload.username, role: payload.role };
    }
    return null;
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    // Decodifica el token JWT para obtener el rol (esto requiere una biblioteca como jwt-decode)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role; // Supone que el rol está en `payload.role`
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
