import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GetProfileResponse } from '../../models/response/get_profile_res';
import { UserService } from '../../services/api/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  user?: GetProfileResponse;
  constructor(private router: Router, private userService: UserService) { }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.user = await this.userService.getUser();
      console.log('User loaded:', this.user); // <--- log เพื่อเช็ค
    } catch (err) {
      console.error('Failed to load user', err);
      this.router.navigate(['/login']);
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
