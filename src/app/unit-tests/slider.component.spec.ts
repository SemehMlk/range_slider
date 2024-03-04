import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { LnsSliderComponent } from './slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LnsSliderComponent', () => {
  let spectator: Spectator<LnsSliderComponent>;
  let component: LnsSliderComponent;

  const createComponent = createComponentFactory({
    component: LnsSliderComponent,
    imports: [FormsModule, ReactiveFormsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the slider prefix and suffix', () => {
    const prefix = 'Prefix';
    const suffix = 'Suffix';
    component.sliderPrefix = prefix;
    component.sliderSuffix = suffix;
    spectator.detectChanges();

    const prefixEl = spectator.query('.slider-prefix');
    const suffixEl = spectator.query('.slider-suffix');
    expect(prefixEl).toHaveText(prefix);
    expect(suffixEl).toHaveText(suffix);
  });

  it('should update the model when the slider value changes and emit change', () => {
    const newValue = 42;
    spectator.detectChanges();
    spectator.triggerEventHandler('input', 'change', { target: { value: newValue } });
    expect(component.sliderValue).toEqual(newValue);
  });

  it('should show error message when there is a validation error', () => {
    component.hasValidationError = true;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).toExist();
  });

  it('should not show error message when there is no validation error', () => {
    component.hasValidationError = false;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).not.toExist();
  });

  // More tests...

});
