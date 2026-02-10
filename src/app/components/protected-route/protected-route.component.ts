import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected-route',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class ProtectedRoute {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
