import { Directive, ElementRef, Renderer2, Input, AfterViewInit, OnInit, HostListener, Host, Optional } from '@angular/core';
import { CustomSliderComponent } from '../custom-slider.component';

@Directive({
  selector: '[lnscSliderStartThumb], [lnscSliderEndThumb]'
})
export class LnscSliderRangeThumbDirective implements OnInit {

  @Input() lnscSliderStartThumb!: string;
  @Input() lnscSliderEndThumb!: string;

  constructor(private el: ElementRef,@Optional() @Host() private slider: CustomSliderComponent) {}

  ngOnInit() {
    // Configurez la directive pour qu'elle interagisse correctement avec votre slider
    let element = this.el.nativeElement;
    // Initialiser la valeur et le min/max/step si nécessaire

  }
  
  @HostListener('input', ['$event.target.value'])
  onInput(value: never) {
    this.slider.updateVisuals2(value)

    // Mettre à jour la valeur du FormControl associé dans le composant de slider
    if (this.lnscSliderStartThumb) {
      //this.slider.range.get('single')?.setValue(value);
    } else if (this.lnscSliderStartThumb) {
        console.log("here baby")
      //this.slider.range.get('start')?.setValue(value);
    } else if (this.lnscSliderEndThumb) {
      //this.slider.range.get('end')?.setValue(value);
    }
  }
}