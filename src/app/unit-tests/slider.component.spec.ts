import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LnsSliderComponent } from './slider.component';
import { ThumbService } from '../../services/thumb.service';

describe('LnsSliderComponent', () => {
  let spectator: Spectator<LnsSliderComponent>;
  let component: LnsSliderComponent;

  // Créez une usine de composants Spectator
  const createComponent = createComponentFactory({
    component: LnsSliderComponent,
    mocks: [ThumbService]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register component with thumbService on AfterViewInit', () => {
    const thumbService = spectator.inject(ThumbService);
    spectator.detectChanges(); // Detect changes to trigger ngAfterViewInit
    expect(thumbService.registerComponent).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should update the slider value', () => {
    const thumbService = spectator.inject(ThumbService);
    const newValue = 42;
    component.sliderValue = newValue;
    expect(thumbService.updateInputsAndSliders).toHaveBeenCalledWith(newValue, null);
  });

  it('should react to thumb focus changes', () => {
    // Simulate thumb focus change
    const thumbService = spectator.inject(ThumbService);
    thumbService.getFocusState.mockReturnValue(of({ id: 'left', value: 10 }));
    spectator.detectChanges(); // Initialize subscriptions
    expect(component.isThumbFocused).toBeTruthy();
  });

  it('should react to thumb hover changes', () => {
    // Simulate thumb hover change
    const thumbService = spectator.inject(ThumbService);
    thumbService.getHoverState.mockReturnValue(of({ id: 'left', value: 10 }));
    spectator.detectChanges(); // Initialize subscriptions
    expect(component.isThumbHovered).toBeTruthy();
  });

  it('should emit change when slider value changes', () => {
    // Suppose there's an output for value changes
    const onChangeSpy = spyOn(component.valueChange, 'emit');
    const newValue = 42;
    component.sliderValue = newValue;
    expect(onChangeSpy).toHaveBeenCalledWith(newValue);
  });

  it('should call onTouch when slider is touched', () => {
    // Spy on the onTouch method
    const onTouchSpy = spyOn(component, 'onTouch');
    spectator.dispatchTouchEvent(spectator.query('input'), 'touchstart');
    expect(onTouchSpy).toHaveBeenCalled();
  });

  it('should validate slider value', () => {
    // Assume you have a validator method in your component
    component.min = 0;
    component.max = 100;
    const invalidValue = -10;
    component.sliderValue = invalidValue;
    const errors = component.validate(component as any);
    expect(errors).toEqual({ 'min': { 'actualValue': invalidValue, 'requiredValue': 0 } });
  });

  it('should not have validation errors when value is valid', () => {
    component.min = 0;
    component.max = 100;
    const validValue = 50;
    component.sliderValue = validValue;
    const errors = component.validate(component as any);
    expect(errors).toBeNull();
  });

});
