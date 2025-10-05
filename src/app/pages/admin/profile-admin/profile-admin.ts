import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetProfileResponse } from '../../../models/response/get_profile_res';
import { UserService } from '../../../services/api/user';

@Component({
  selector: 'app-profile-admin',
  imports: [],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.scss'
})
export class ProfileAdmin {
  admin?: GetProfileResponse;
  
    constructor(private router: Router, private userService: UserService) { }
  
    async ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return;
      }
  
      try {
        this.admin = await this.userService.getUser();
        console.log('User loaded:', this.admin);
      } catch (err) {
        console.error('Failed to load user', err);
        this.router.navigate(['/login']);
      }
    }
}
