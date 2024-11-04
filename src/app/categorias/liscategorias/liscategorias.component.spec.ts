import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiscategoriasComponent } from './liscategorias.component';

describe('LiscategoriasComponent', () => {
  let component: LiscategoriasComponent;
  let fixture: ComponentFixture<LiscategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiscategoriasComponent]
    });
    fixture = TestBed.createComponent(LiscategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
