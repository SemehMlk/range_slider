// thumb.service.spec.ts
import { createServiceFactory, SpectatorService, mockProvider } from '@ngneat/spectator/jest';
import { Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { ThumbService } from './thumb.service';
import { BehaviorSubject } from 'rxjs';

describe('ThumbService', () => {
  let spectator: SpectatorService<ThumbService>;
  let service: ThumbService;

  const mockElementRef: ElementRef = new ElementRef(document.createElement('div'));
  const mockRenderer2: Renderer2 = {
    setStyle: jest.fn(),
    // Add other Renderer2 methods if needed
  };

  const createService = createServiceFactory({
    service: ThumbService,
    providers: [
      mockProvider(RendererFactory2, {
        createRenderer: () => mockRenderer2
      })
    ]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerComponent should update sliderSubject', () => {
    const sliderParams = { sliderBar: mockElementRef, rightSlider: null, leftSlider: mockElementRef, min: 0, max: 100, isRange: false };
    service.registerComponent(sliderParams);
    service.sliderSubject.subscribe(value => {
      expect(value).toEqual(sliderParams);
    });
  });

  it('updateSlider should call setStyle for non-range slider', () => {
    service.registerComponent({ sliderBar: mockElementRef, rightSlider: null, leftSlider: mockElementRef, min: 0, max: 100, isRange: false });
    service.updateSlider();
    expect(mockRenderer2.setStyle).toHaveBeenCalledTimes(3); // Adjust based on how many times you expect setStyle to be called
  });

  it('setFocus should update focusSubject', done => {
    const thumb = { id: 'left', value: 10 };
    service.setFocus(thumb);
    service.focusSubject.subscribe(value => {
      expect(value).toEqual(thumb);
      done();
    });
  });

  it('clearFocus should nullify focusSubject', done => {
    service.clearFocus();
    service.focusSubject.subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('setHover should update hoverSubject', done => {
    const thumb = { id: 'right', value: 20 };
    service.setHover(thumb);
    service.hoverSubject.subscribe(value => {
      expect(value).toEqual(thumb);
      done();
    });
  });

  it('clearHover should nullify hoverSubject', done => {
    service.clearHover();
    service.hoverSubject.subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('updateInputsAndSliders should set slider values and update slider', () => {
    const setSliderValueSpy = jest.spyOn(service as any, 'setSliderValue');
    const updateSliderSpy = jest.spyOn(service, 'updateSlider');

    service.updateInputsAndSliders(10, 90);

    expect(setSliderValueSpy).toHaveBeenCalledTimes(2);
    expect(updateSliderSpy).toHaveBeenCalledTimes(1);
  });

  // Additional tests can go here. For example, testing edge cases, error conditions, etc.

});
