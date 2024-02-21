import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss']
})
export class CustomSliderComponent implements AfterViewInit {

  @ViewChild('sliderBar') sliderBar!: ElementRef;
  @ViewChild('leftSlider', { static: false }) leftSlider?: ElementRef<HTMLInputElement>;
  @ViewChild('rightSlider', { static: false }) rightSlider?: ElementRef<HTMLInputElement>;

  // Ajoutez des indicateurs pour gérer le mode du slider (simple ou range)
  isRange: boolean = true; // Déterminez ce flag en fonction de la logique de votre application

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.updateVisuals();
  }

  updateLeftSlider(): void {
    if (!this.leftSlider || !this.rightSlider) return;
    const leftValue = parseInt(this.leftSlider.nativeElement.value);
    const rightValue = Math.max(parseInt(this.rightSlider.nativeElement.value), leftValue);
    this.rightSlider.nativeElement.value = rightValue.toString();
    this.updateVisuals();
  }

  updateRightSlider(): void {
    if (!this.leftSlider || !this.rightSlider) return;
    const rightValue = parseInt(this.rightSlider.nativeElement.value);
    const leftValue = Math.min(parseInt(this.leftSlider.nativeElement.value), rightValue);
    this.leftSlider.nativeElement.value = leftValue.toString();
    this.updateVisuals();
  }

  updateVisuals(): void {
    
    // S'assurer que tous les éléments nécessaires sont définis
    if (!this.leftSlider || !this.rightSlider || !this.sliderBar) return;

    // Calculer les pourcentages basés sur les valeurs actuelles des sliders
    const leftValue = parseInt(this.leftSlider.nativeElement.value);
    const rightValue = parseInt(this.rightSlider.nativeElement.value);
    const maxValue = parseInt(this.leftSlider.nativeElement.max);
  
    const leftPercentage = (leftValue / maxValue) * 100;
    const rightPercentage = (rightValue / maxValue) * 100;

    if (!this.isRange) {
      // Logique spécifique au slider simple
      const value = parseInt(this.rightSlider.nativeElement.value);
      const maxValue = parseInt(this.rightSlider.nativeElement.max);
    
      const percentage = (value / maxValue) * 100;
    
      // Supposant que tu as un élément visuel pour représenter la barre de progression du slider simple
      const singleRangeElement = this.sliderBar.nativeElement.querySelector('[single-range]');
      if (singleRangeElement) {
        this.renderer.setStyle(singleRangeElement, 'width', `${percentage}%`);
      }
    }
  
    // Sélectionner directement les éléments visuels pour la mise à jour
    const rangeElement = this.sliderBar.nativeElement.querySelector('[range]');
    const leftThumbElement = this.sliderBar.nativeElement.querySelector('[thumb]');
    const rightThumbElement = this.sliderBar.nativeElement.querySelector('[thumb]:last-child');

    const inverseLeftElement = this.sliderBar.nativeElement.querySelector('[inverse-left]');
    const inverseRightElement = this.sliderBar.nativeElement.querySelector('[inverse-right]');

    if (rangeElement  && rightThumbElement && inverseLeftElement && inverseRightElement) {
      this.renderer.setStyle(rangeElement, 'left', `${leftPercentage}%`);
      this.renderer.setStyle(rangeElement, 'right', `${100 - rightPercentage}%`);
      this.renderer.setStyle(leftThumbElement, 'left', `${leftPercentage}%`);
      this.renderer.setStyle(rightThumbElement, 'left', `${rightPercentage}%`);

      this.renderer.setStyle(inverseLeftElement, 'width', `${leftPercentage}%`);
      this.renderer.setStyle(inverseRightElement, 'width', `${100 - rightPercentage}%`);
    }
  }
}
