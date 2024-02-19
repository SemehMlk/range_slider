import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
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

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const sliderRect = this.slider.nativeElement.getBoundingClientRect();
      const sliderStart = sliderRect.left;
      const sliderWidth = sliderRect.width;

      let newPosition = (moveEvent.clientX - sliderStart) / sliderWidth * 100;
      newPosition = Math.max(0, Math.min(newPosition, 100)); // Clamp between 0 and 100

      let value = this.min + (newPosition / 100) * (this.max - this.min);
      value = Math.round(value / this.step) * this.step; // Apply step
      value = Math.max(this.min, Math.min(value, this.max)); // Clamp between min and max

      if (thumb === 'min' && value < this.maxVal) {
        this.minVal = value;
      } else if (thumb === 'max' && value > this.minVal) {
        this.maxVal = value;
      }

      this.updateThumbs();
      this.rangeChange.emit({min: this.minVal, max: this.maxVal});
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

}
