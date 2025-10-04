import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { login } from '../../../services/api/login';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [MatToolbarModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';

  constructor(private loginService: login, private router: Router) { }

  async onLogin() {
    try {
      const res = await this.loginService.login({ email: this.email, password: this.password });
      localStorage.setItem('token', res.token);

      if (res.payload.role === 'admin') {
        this.router.navigate(['/profile-admin']);
      } else {
        this.router.navigate(['/profile']);
      }

    } catch (err) {
      console.error('Login failed', err);
    }
  }
}
