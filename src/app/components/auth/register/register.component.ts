// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.username, this.password, this.role)
      .subscribe(
        () => {
          alert('Registro exitoso');
          this.router.navigate(['/login']); // Redirige al login después del registro
        },
        () => {
          alert('Error en el registro');
        }
      );
  }
}
