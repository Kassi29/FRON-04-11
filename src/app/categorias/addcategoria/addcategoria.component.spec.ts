import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoriaComponent } from './addcategoria.component';

describe('AddcategoriaComponent', () => {
  let component: AddcategoriaComponent;
  let fixture: ComponentFixture<AddcategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcategoriaComponent]
    });
    fixture = TestBed.createComponent(AddcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
