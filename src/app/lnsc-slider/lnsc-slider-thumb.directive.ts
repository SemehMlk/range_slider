import { Directive, ElementRef, Renderer2, Input, AfterViewInit, HostListener } from '@angular/core';
import { LnscSliderComponent } from './lnsc-slider.component';

@Directive({
  selector: '[lnscSliderThumb], [lnscSliderStartThumb], [lnscSliderEndThumb]'
})
export class LnscSliderThumbDirective {
    @Input() lnscSliderThumb!: string;
    @Input() lnscSliderStartThumb!: string;
    @Input() lnscSliderEndThumb!: string;
  
    constructor(private el: ElementRef, private slider: LnscSliderComponent) {}
  
    ngOnInit() {
      // Initialize directive logic, e.g., set initial position
    }
  
    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
      // Handle input event, update slider component form control values
    }
}