import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-lnsc-slider',
  templateUrl: './lnsc-slider.component.html',
  styleUrls: ['./lnsc-slider.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LnscSliderComponent,
    multi: true
  }]
})
export class LnscSliderComponent implements AfterContentInit, ControlValueAccessor {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;

  @ContentChildren('lnscSliderThumb') singleThumb!: QueryList<any>;
  @ContentChildren('lnscSliderStartThumb') startThumb!: QueryList<any>;
  @ContentChildren('lnscSliderEndThumb') endThumb!: QueryList<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngAfterContentInit() {
    this.initSlider();
  }

  private initSlider() {
    // Initialize slider logic here, update form controls based on thumb positions
    // This is where you would add event listeners to the native elements and update the form controls accordingly
  }

  writeValue(obj: any): void {
    if (obj) {
      this.range.setValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // If needed, disable slider functionality
  }
}
