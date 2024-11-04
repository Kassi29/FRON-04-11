import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtesanoComponent } from './artesano.component';

describe('ArtesanoComponent', () => {
  let component: ArtesanoComponent;
  let fixture: ComponentFixture<ArtesanoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtesanoComponent]
    });
    fixture = TestBed.createComponent(ArtesanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
