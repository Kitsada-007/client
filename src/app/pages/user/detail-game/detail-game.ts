import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetGameResponse } from '../../../models/response/get_game_res';
import { GamesService } from '../../../services/api/games';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-game',
  imports: [DatePipe, CommonModule],
  templateUrl: './detail-game.html',
  styleUrl: './detail-game.scss'
})
export class DetailGame {
  gameId!: number;
  game!: GetGameResponse;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    // รับ id จาก URL
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGame();
  }

  async loadGame() {
    try {
      this.game = await this.gamesService.getGameById(this.gameId);
    } catch (error) {
      console.error('โหลดข้อมูลเกมไม่สำเร็จ', error);
    } finally {
      this.loading = false;
    }
  }
}
