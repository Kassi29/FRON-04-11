import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomunidadComponent } from './addcomunidad.component';

describe('AddcomunidadComponent', () => {
  let component: AddcomunidadComponent;
  let fixture: ComponentFixture<AddcomunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcomunidadComponent]
    });
    fixture = TestBed.createComponent(AddcomunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
