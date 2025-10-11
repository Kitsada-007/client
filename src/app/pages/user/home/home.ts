import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { GamesService } from '../../../services/api/games';
import { GetGameResponse } from '../../../models/response/get_game_res';
import { CommonModule } from '@angular/common';
import { Datum, GetTopGameResponse } from '../../../models/response/get_top_res';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  games: GetGameResponse[] = [];
  topGames: Datum[] = [];
  genreChunks: string[][] = [];
  loading = true;

  constructor(private router: Router, private gamesService: GamesService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.loadGames();
    this.loadTopGames();
  }

  async loadGames() {
    try {
      this.games = await this.gamesService.getGameAll();

      // สร้าง genreChunks สำหรับ carousel หมวดหมู่
      const genres = Array.from(new Set(this.games.map(g => g.genre)));
      this.genreChunks = [];
      for (let i = 0; i < genres.length; i += 4) {
        this.genreChunks.push(genres.slice(i, i + 4));
      }

    } catch (err) {
      console.error('โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.loading = false;
    }
  }

  async loadTopGames() {
    try {
      const response = await this.gamesService.getTopGame();
      if (response.success) {
        this.topGames = response.data.slice(0, 5);
      }
    } catch (err) {
      console.error('โหลด Top เกมไม่สำเร็จ:', err);
    }
  }

  // ไปหน้า Details ตามไอดีที่กด
  goToDetail(gameId: number) {
    this.router.navigate(['/detail-game', gameId]);
  }
  // ไปหน้า หมวดหมู่ ตามที่กด
  goToCategory(genre: string) {

    this.router.navigate(['/typegame', genre]);
  }


  getTopGameImage(game: Datum): string {
    if (!game.images) return 'assets/Images/no-image.png';

    // ถ้าเป็น string ที่มีหลาย URL คั่นด้วย comma
    const urls = game.images.split(',').map(u => u.trim());
    return urls[0] || 'assets/Images/no-image.png';
  }



}
