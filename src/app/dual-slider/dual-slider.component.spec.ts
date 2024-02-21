import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualSliderComponent } from './dual-slider.component';

describe('DualSliderComponent', () => {
  let component: DualSliderComponent;
  let fixture: ComponentFixture<DualSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DualSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DualSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
