import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderArtComponent } from './slider-art.component';

describe('SliderArtComponent', () => {
  let component: SliderArtComponent;
  let fixture: ComponentFixture<SliderArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderArtComponent]
    });
    fixture = TestBed.createComponent(SliderArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
