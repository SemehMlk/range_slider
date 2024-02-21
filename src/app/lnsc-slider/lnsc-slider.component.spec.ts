import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LnscSliderComponent } from './lnsc-slider.component';

describe('LnscSliderComponent', () => {
  let component: LnscSliderComponent;
  let fixture: ComponentFixture<LnscSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LnscSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LnscSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
