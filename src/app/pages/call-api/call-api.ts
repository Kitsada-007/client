import { R } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { GetGameResponse } from '../../models/response/get_game_res';

@Component({
  selector: 'app-call-api',
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi {
  constructor(private http: HttpClient) {}
  games : GetGameResponse[] = [];
  async callApi() {
    const url = 'https://server-three-beryl.vercel.app/api/games';
    let data = await lastValueFrom(this.http.get(url));
    this.games = data as GetGameResponse[];
    console.log(this.games);
    console.log(this.games[0].name);
    console.log('Call Completed');
  }
}
