import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadministradorComponent } from './listadministrador.component';

describe('ListadministradorComponent', () => {
  let component: ListadministradorComponent;
  let fixture: ComponentFixture<ListadministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadministradorComponent]
    });
    fixture = TestBed.createComponent(ListadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
