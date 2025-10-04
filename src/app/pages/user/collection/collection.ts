import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss'
})
export class Collection {
  cards = Array(5).fill({ img: 'assets/Images/collection.png' });
  constructor(private router: Router) { }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}
