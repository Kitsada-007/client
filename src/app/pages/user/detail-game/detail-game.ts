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
  game: GetGameResponse | null = null;
  loading = true;
  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGame();
  }

  async loadGame() {
    try {
      const data = await this.gamesService.getGameById(this.gameId);
      this.game = data;
      if (this.game.images && this.game.images.length > 0) {
        this.selectedImage = this.game.images[0];
      }
    } catch (error) {
      console.error('โหลดข้อมูลเกมไม่สำเร็จ', error);
    } finally {
      this.loading = false;
    }
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  formatThaiDate(date: Date | string | undefined): string {
    if (!date) return '-';
    const d = date instanceof Date ? date : new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  }

}
