import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcomunidadComponent } from './listcomunidad.component';

describe('ListcomunidadComponent', () => {
  let component: ListcomunidadComponent;
  let fixture: ComponentFixture<ListcomunidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcomunidadComponent]
    });
    fixture = TestBed.createComponent(ListcomunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
