import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GetGameResponse } from '../../../models/response/get_game_res';
import { GamesService } from '../../../services/api/games';
import { CommonModule } from '@angular/common';
import { GetGameRequest } from '../../../models/request/get_game_req';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home-admin',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.scss'
})
export class HomeAdmin {
  games: GetGameResponse[] = [];
  loading = true;
  gameForm: FormGroup;
  editingGameId: string | null = null;

  constructor(private gamesService: GamesService, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      genre: ['', Validators.required],
      description: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadGames();
  }
  // โหลดข้อมูลเกมทั้งหมด
  async loadGames() {
    try {
      this.games = await this.gamesService.getGameAll();
    } catch (err) {
      console.error('โหลดข้อมูลเกมไม่สำเร็จ:', err);
    } finally {
      this.loading = false;
    }
  }
  // ฟอร์แมตวันที่เป็นรูปแบบไทย
  formatThaiDate(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear() + 543; // แปลงเป็น พ.ศ.
    return `${day}/${month}/${year}`;
  }



  // เพิ่มเกมใหม่ (ยังสามารถใช้ได้ แต่ submitGame จะรวมทั้งเพิ่ม/แก้ไข)
  async addGame() {
    if (this.gameForm.invalid) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const newGame: GetGameRequest = {
      name: this.gameForm.value.name,
      price: this.gameForm.value.price.toString(),
      genre: this.gameForm.value.genre,
      description: this.gameForm.value.description
    };

    try {
      await this.gamesService.addNewGame(newGame);
      alert('เพิ่มเกมสำเร็จ!');
      this.gameForm.reset();
      await this.loadGames();
    } catch (err) {
      console.error('เพิ่มเกมไม่สำเร็จ:', err);
      alert('เพิ่มเกมไม่สำเร็จ!');
    }
  }

  // เตรียมฟอร์มสำหรับแก้ไขเกม
  editGame(game: GetGameResponse) {
    this.editingGameId = game.id.toString();
    this.gameForm.setValue({
      name: game.name,
      price: game.price,
      genre: game.genre,
      description: game.description
    });

  }

  // ยกเลิกการแก้ไข
  cancelEdit() {
    this.gameForm.reset();
    this.editingGameId = null;
  }

  // ฟังก์ชัน submit ใช้ทั้งเพิ่มและแก้ไข
  async submitGame() {
    if (this.gameForm.invalid) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const gameData: GetGameRequest = {
      name: this.gameForm.value.name,
      price: this.gameForm.value.price.toString(),
      genre: this.gameForm.value.genre,
      description: this.gameForm.value.description
    };

    try {
      if (this.editingGameId) {
        await this.gamesService.editGame(this.editingGameId, gameData);
        alert('แก้ไขเกมสำเร็จ!');
      } else {
        await this.gamesService.addNewGame(gameData);
        alert('เพิ่มเกมสำเร็จ!');
      }

      this.gameForm.reset();
      this.editingGameId = null;
      await this.loadGames();
    } catch (err) {
      console.error('เกิดข้อผิดพลาด:', err);
      alert('ไม่สำเร็จ!');
    }
  }

  // ลบเกม
  async removeGame(game: GetGameResponse) {
    if (!confirm(`คุณแน่ใจไหมว่าจะลบเกม "${game.name}"`)) return;

    try {
      await this.gamesService.deleteGame(game.id);
      alert('ลบเกมสำเร็จ!');
      await this.loadGames(); // รีโหลดรายการเกม
    } catch (err) {
      console.error('ลบเกมไม่สำเร็จ:', err);
      alert('ลบเกมไม่สำเร็จ!');
    }
  }







}
