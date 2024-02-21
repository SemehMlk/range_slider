import { Directive, ElementRef, Renderer2, Input, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { LnscSliderComponent } from './lnsc-slider.component';

@Directive({
  selector: '[lnscSliderStartThumbs], [lnscSliderEndThumbs]'
})
export class LnscSliderRangeThumbDirective implements OnInit {
  @Input() lnscSliderThumb!: string;
  @Input() lnscSliderStartThumb!: string;
  @Input() lnscSliderEndThumb!: string;

  constructor(private el: ElementRef, private slider: LnscSliderComponent) {}

  ngOnInit() {
    // Configurez la directive pour qu'elle interagisse correctement avec votre slider
    let element = this.el.nativeElement;
    // Initialiser la valeur et le min/max/step si nécessaire
    element.min = this.slider.min;
    element.max = this.slider.max;
    element.step = this.slider.step;
  }
  
  @HostListener('input', ['$event.target.value'])
  onInput(value: never) {
    // Mettre à jour la valeur du FormControl associé dans le composant de slider
    if (this.lnscSliderThumb) {
      this.slider.range.get('single')?.setValue(value);
    } else if (this.lnscSliderStartThumb) {
      this.slider.range.get('start')?.setValue(value);
    } else if (this.lnscSliderEndThumb) {
      this.slider.range.get('end')?.setValue(value);
    }
  }
}