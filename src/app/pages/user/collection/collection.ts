import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-collection',
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss'
})
export class Collection {
  cards = Array(5).fill({ img: 'assets/Images/collection.png' });
}
