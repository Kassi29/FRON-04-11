import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDelivComponent } from './slider-deliv.component';

describe('SliderDelivComponent', () => {
  let component: SliderDelivComponent;
  let fixture: ComponentFixture<SliderDelivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderDelivComponent]
    });
    fixture = TestBed.createComponent(SliderDelivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
