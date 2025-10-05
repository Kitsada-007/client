import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { GetProfileResponse } from '../../models/response/get_profile_res';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private constants: Constants) { }

  public async getUser(): Promise<GetProfileResponse> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = this.constants.API_ENDPOINT + '/user';

    const res = await lastValueFrom(this.http.get<GetProfileResponse[]>(url, { headers }));
    console.log('API response:', res);

    return res[0]; // <--- เอา object แรกของ array
  }
  // อัปโหลดรูปโปรไฟล์
  public async uploadProfile(file: File, token: string): Promise<any> {
    const formData = new FormData();
    formData.append('profile', file);

    const url = this.constants.API_ENDPOINT + '/user/upload';

    return await lastValueFrom(
      this.http.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
  }

}
