import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetProfileResponse } from '../../../models/response/get_profile_res';
import { UserService } from '../../../services/api/user';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  user?: GetProfileResponse;

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile?: File;

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.user = await this.userService.getUser();
    } catch (err) {
      console.error('Failed to load user', err);
      this.router.navigate(['/login']);
    }
  }

  // เลือกไฟล์
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.uploadProfile();
    }
  }

  // อัปโหลดไฟล์ไป Backend
  async uploadProfile() {
    if (!this.selectedFile) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('คุณยังไม่ได้เข้าสู่ระบบ');
      return;
    }

    try {
      const response: any = await this.userService.uploadProfile(this.selectedFile, token);
      console.log('Upload success:', response);

      if (response.url) {
        this.user!.profile_image = response.url; // อัปเดต UI
      }

    } catch (err) {
      console.error('Upload failed', err);
      alert('อัปโหลดรูปโปรไฟล์ล้มเหลว');
    }
  }




}
