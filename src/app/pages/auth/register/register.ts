import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatHint } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatHint, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

}
