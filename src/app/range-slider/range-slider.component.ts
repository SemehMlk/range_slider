import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  singleValue: number = 0;

  // Valeurs pour le slider de plage
  minValue: number = 0;
  maxValue: number = 100;

  // Mettre à jour la valeur pour le slider simple
  updateSingleValue(event: Event): void {
    this.singleValue = +(event.target as HTMLInputElement).value;
  }

  // Mettre à jour les valeurs pour le slider de plage
  updateRangeValues(min: number, max: number): void {
    this.minValue = min;
    this.maxValue = max;
  }
}
