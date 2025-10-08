import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetProfileResponse } from '../../../models/response/get_profile_res';
import { UserService } from '../../../services/api/user';

@Component({
  selector: 'app-wallet',
  imports: [],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss'
})
export class Wallet {

  user?: GetProfileResponse;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    try {
      this.user = await this.userService.getUser();
      console.log('Wallet balance:', this.user.wallet_balance);
    } catch (err) {
      console.error('Failed to load user', err);
      this.router.navigate(['/login']);
    }
  }


}
