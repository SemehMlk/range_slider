import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DualSliderComponent } from './dual-slider/dual-slider.component';
import { SliderMaxDirective } from './slider.max.directive';
import { SliderMinDirective } from './slider.min.directive';
import { CustomSliderComponent } from './custom-slider/custom-slider.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { FormsModule } from '@angular/forms';
import { LnscSliderComponent } from './lnsc-slider/lnsc-slider.component';
import { LnscSliderThumbDirective } from './lnsc-slider/lnsc-slider-thumb.directive';
import { LnscSliderRangeThumbDirective } from './lnsc-slider/lnsc-slider-ragne-thumb.directive';

@NgModule({
  declarations: [
    AppComponent,
    DualSliderComponent,
    SliderMinDirective,
    SliderMaxDirective,
    CustomSliderComponent,
    RangeSliderComponent,
    LnscSliderComponent,
    LnscSliderThumbDirective,
    LnscSliderRangeThumbDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
