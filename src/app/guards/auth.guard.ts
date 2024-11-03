// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = route.data['roles'];
    const token = this.authService.getToken();

    if (this.authService.isAuthenticated() && token) {
      const userRole = JSON.parse(atob(token.split('.')[1])).role;

      // Verifica si el rol del usuario está dentro de los roles permitidos
      if (allowedRoles && allowedRoles.includes(userRole)) {
        return true;
      }

      this.router.navigate(['/unauthorized']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
