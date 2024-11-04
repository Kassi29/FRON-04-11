import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisalmacenComponent } from './lisalmacen.component';

describe('LisalmacenComponent', () => {
  let component: LisalmacenComponent;
  let fixture: ComponentFixture<LisalmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LisalmacenComponent]
    });
    fixture = TestBed.createComponent(LisalmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
