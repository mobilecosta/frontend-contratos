import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPage {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    if (!this.email) {
      this.error = 'Por favor, preencha o email';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const user = await this.authService.login(this.email).toPromise();
      if (user) {
        this.router.navigate(['/']);
      }
    } catch (err: any) {
      this.error = 'Falha ao fazer login. Verifique suas credenciais.';
    } finally {
      this.loading = false;
    }
  }
}
