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

  // ... autres tests

  it('should display the slider prefix and suffix', () => {
    const prefix = 'Prefix';
    const suffix = 'Suffix';
    component.sliderPrefix = prefix;
    component.sliderSuffix = suffix;
    spectator.detectChanges();

    const prefixEl = spectator.query('.slider-prefix');
    const suffixEl = spectator.query('.slider-suffix');
    expect(prefixEl).not.toBeNull();
    expect(prefixEl.textContent).toContain(prefix);
    expect(suffixEl).not.toBeNull();
    expect(suffixEl.textContent).toContain(suffix);
  });

  it('should show error message when there is a validation error', () => {
    component.hasValidationError = true;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).not.toBeNull();
  });

  it('should not show error message when there is no validation error', () => {
    component.hasValidationError = false;
    spectator.detectChanges();
    const errorEl = spectator.query('.error-message');
    expect(errorEl).toBeNull();
  });

  // Plus de tests...
});
