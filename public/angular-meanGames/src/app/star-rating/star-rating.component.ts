import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  _rating: Number = 0;
  stars: Number[] = [];
  @Input()
  set rating(rating: Number) {
    this._rating = rating;
    this.stars = new Array<Number>(rating)
  }
}
