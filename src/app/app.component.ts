import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours/tours.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ToursComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isPopupVisible = false;

  openTours() {
    this.isPopupVisible = true;
  }

  closeTours() {
    this.isPopupVisible = false;
  }
}
