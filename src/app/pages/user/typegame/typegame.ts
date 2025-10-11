import { Component } from '@angular/core';
import { GamesService } from '../../../services/api/games';
import { ActivatedRoute } from '@angular/router';
import { GetGameResponse } from '../../../models/response/get_game_res';

@Component({
  selector: 'app-typegame',
  imports: [],
  templateUrl: './typegame.html',
  styleUrl: './typegame.scss'
})
export class Typegame {
   genre!: string;
  games: GetGameResponse[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private gamesService: GamesService) {}

  ngOnInit() {
    this.genre = decodeURIComponent(this.route.snapshot.paramMap.get('genre') || '');
    this.loadGames();
  }

  async loadGames() {
    try {
      const allGames = await this.gamesService.getGameAll();
      this.games = allGames.filter(g => g.genre === this.genre);
    } catch (err) {
      console.error('โหลดเกมหมวดหมู่ไม่สำเร็จ', err);
    } finally {
      this.loading = false;
    }
  }

  goToDetail(gameId: number) {
    // ไปหน้า Detail Game
    window.location.href = `/detail-game/${gameId}`;
  }
}
