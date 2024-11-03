import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Autenticación exitosa', response);
          this.authService.saveToken(response.token);
          this.router.navigate(['/news']);
          console.log('Redirigiendo a /news');
        } else {
          console.error('Error al iniciar sesión', response.message);
          alert(response.message); // Muestra el mensaje del backend
        }
      },
      error: (error) => {
        console.error('Error en el servidor', error);
        alert(`Error en el inicio de sesión: ${error.message}`);
      }
    });
  }
  
  
}
