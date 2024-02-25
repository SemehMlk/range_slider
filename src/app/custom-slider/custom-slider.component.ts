import { AfterViewInit, Component, ContentChildren, ElementRef, QueryList, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { LnscSliderRangeThumbDirective } from './directives/start.directive';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomSliderComponent implements AfterViewInit {

  @ViewChild('sliderBar') sliderBar!: ElementRef;
  @ViewChild('leftSlider', { static: false }) leftSlider?: ElementRef<HTMLInputElement>;
  @ViewChild('rightSlider', { static: false }) rightSlider?: ElementRef<HTMLInputElement>;

  @ViewChild('singleSlider') singleSlider?: ElementRef<HTMLInputElement>;

  isRange = false;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    //this.updateVisuals();
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
    if (this.isRange) {
      // S'assurer que tous les éléments nécessaires sont définis
      if (!this.leftSlider || !this.rightSlider || !this.sliderBar) return;

      // Calculer les pourcentages basés sur les valeurs actuelles des sliders
      const leftValue = parseInt(this.leftSlider.nativeElement.value);
      const rightValue = parseInt(this.rightSlider.nativeElement.value);
      const maxValue = parseInt(this.leftSlider.nativeElement.max);

      const leftPercentage = (leftValue / maxValue) * 100;
      const rightPercentage = (rightValue / maxValue) * 100;

      // Sélectionner directement les éléments visuels pour la mise à jour
      const rangeElement = this.sliderBar.nativeElement.querySelector('[range]');
      const leftThumbElement = this.sliderBar.nativeElement.querySelector('[thumb]');
      const rightThumbElement = this.sliderBar.nativeElement.querySelector('[thumb]:last-child');

      const inverseLeftElement = this.sliderBar.nativeElement.querySelector('[inverse-left]');
      const inverseRightElement = this.sliderBar.nativeElement.querySelector('[inverse-right]');

      if (rangeElement && rightThumbElement && inverseLeftElement && inverseRightElement) {
        this.renderer.setStyle(rangeElement, 'left', `${leftPercentage}%`);
        this.renderer.setStyle(rangeElement, 'right', `${100 - rightPercentage}%`);
        this.renderer.setStyle(leftThumbElement, 'left', `${leftPercentage}%`);
        this.renderer.setStyle(rightThumbElement, 'left', `${rightPercentage}%`);

        this.renderer.setStyle(inverseLeftElement, 'width', `${leftPercentage}%`);
        this.renderer.setStyle(inverseRightElement, 'width', `${100 - rightPercentage}%`);
      }
    }
    else {
      if (!this.singleSlider || !this.sliderBar) return;

      const value = parseInt(this.singleSlider.nativeElement.value);
      const maxValue = parseInt(this.singleSlider.nativeElement.max);

      const percentage = (value / maxValue) * 100;

      const inverseRightElement = this.sliderBar.nativeElement.querySelector('.inverse-right');

      if (inverseRightElement) {
        this.renderer.setStyle(inverseRightElement, 'width', `${100 - percentage}%`);
      }
    }
  }

  updateSingleSlider(): void {
    if (!this.singleSlider) return;
    this.updateVisuals();
  }
}
