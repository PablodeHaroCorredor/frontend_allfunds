// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, CommonModule],
})
export class AppComponent implements OnInit {
  userInfo: { username: string; role: string } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo(); // Obtiene el nombre y rol del usuario
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.userInfo = null; // Restablece la información del usuario tras el logout
  }
}
