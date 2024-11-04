import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainArtComponent } from './main-art.component';

describe('MainArtComponent', () => {
  let component: MainArtComponent;
  let fixture: ComponentFixture<MainArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainArtComponent]
    });
    fixture = TestBed.createComponent(MainArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
