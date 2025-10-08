import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { GamesService } from '../../../services/api/games';
import { GetGameResponse } from '../../../models/response/get_game_res';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
   games: GetGameResponse[] = [];
  loading = true;

  constructor(private router: Router, private gamesService: GamesService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.loadGames();
  }

  async loadGames() {
    try {
      this.games = await this.gamesService.getGameAll();
    } catch (err) {
      console.error('โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.loading = false;
    }
  }

}
