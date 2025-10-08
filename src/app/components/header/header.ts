import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GetProfileResponse } from '../../models/response/get_profile_res';
import { UserService } from '../../services/api/user';
import { GamesService } from '../../services/api/games';
import { GetGameResponse } from '../../models/response/get_game_res';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  games: GetGameResponse[] = [];        // เกมทั้งหมด
  featuredGames: GetGameResponse[] = []; // เกมเด่น 3-4 เกม
  displayedGames: GetGameResponse[] = []; // เกมที่แสดงใน popup
  searchTerm: string = '';
  showPopup: boolean = false;
  loading = true;
  user?: GetProfileResponse;

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.user = await this.userService.getUser();
      this.games = await this.gamesService.getGameAll();
      this.featuredGames = this.games.slice(0, 4); // เลือกเกมเด่น 3-4 เกม
    } catch (err) {
      console.error('โหลดข้อมูลไม่สำเร็จ', err);
      this.router.navigate(['/login']);
    } finally {
      this.loading = false;
    }
  }

  // ฟังก์ชันค้นหา
  searchGames() {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      // ถ้าไม่พิมพ์อะไร ให้โชว์ featured games
      this.displayedGames = [...this.featuredGames];
    } else {
      this.displayedGames = this.games.filter(
        g => g.name.toLowerCase().includes(term) || g.genre.toLowerCase().includes(term)
      );
    }
  }

  // เมื่อคลิกออกจาก input ให้ปิด popup (delay เล็กน้อยเพื่อให้ click event ทำงานก่อน)
  onBlurSearch() {
    setTimeout(() => {
      this.showPopup = false;
    }, 150);
  }

  // เลือกเกมจาก popup
  selectGame(game: GetGameResponse) {
    this.searchTerm = game.name;
    this.showPopup = false;
    // สามารถ navigate ไปยังหน้าเกมได้ เช่น:
    // this.router.navigate(['/game', game.id]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

