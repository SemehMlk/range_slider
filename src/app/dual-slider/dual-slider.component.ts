import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { SliderMaxDirective } from '../slider.max.directive';
import { SliderMinDirective } from '../slider.min.directive';

@Component({
  selector: 'app-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss']
})
export class DualSliderComponent implements OnInit {
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() step: number = 0;
  @Output() rangeChange = new EventEmitter<{min: number, max: number}>();

  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ViewChild('minThumb', { static: true }) minThumb!: ElementRef;
  @ViewChild('maxThumb', { static: true }) maxThumb!: ElementRef;

  minVal: number = this.min;
  maxVal: number = this.max;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.updateThumbs();
  }

  updateThumbs(): void {
    const minPercent = ((this.minVal - this.min) / (this.max - this.min)) * 100;
    const maxPercent = ((this.maxVal - this.min) / (this.max - this.min)) * 100;
    this.renderer.setStyle(this.minThumb.nativeElement, 'left', `${minPercent}%`);
    this.renderer.setStyle(this.maxThumb.nativeElement, 'left', `${maxPercent}%`);
  }

  startDragging(event: MouseEvent, thumb: 'min' | 'max'): void {
    event.preventDefault();
  
    // Augmenter le z-index du curseur actif
    const activeThumb = thumb === 'min' ? this.minThumb.nativeElement : this.maxThumb.nativeElement;
    const inactiveThumb = thumb === 'min' ? this.maxThumb.nativeElement : this.minThumb.nativeElement;
    this.renderer.setStyle(activeThumb, 'z-index', '2');
    this.renderer.setStyle(inactiveThumb, 'z-index', '1');
  
    const onMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
  
        const sliderRect = this.slider.nativeElement.getBoundingClientRect();
        const sliderStart = sliderRect.left;
        const sliderWidth = sliderRect.width;
  
        let newPosition = (moveEvent.clientX - sliderStart) / sliderWidth * 100;
        newPosition = Math.max(0, Math.min(newPosition, 100)); // Clamp entre 0 et 100
  
        let value = this.min + (newPosition / 100) * (this.max - this.min);
  
        // Appliquer le step seulement s'il est supérieur à 0
        if (this.step > 0) {
            value = Math.round(value / this.step) * this.step; // Appliquer le step
        }
  
        value = Math.max(this.min, Math.min(value, this.max)); // Clamp entre min et max
  
        if (thumb === 'min' && value <= this.maxVal) {
            this.minVal = value;
        } else if (thumb === 'max' && value >= this.minVal) {
            this.maxVal = value;
        }
  
        this.updateThumbs();
        this.rangeChange.emit({min: this.minVal, max: this.maxVal});
    };
  
    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // Réinitialiser le z-index une fois le déplacement terminé, si nécessaire
        // this.renderer.setStyle(activeThumb, 'z-index', '1');
    };
  
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

}