import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentificacionComponent } from './autentificacion.component';

describe('AutentificacionComponent', () => {
  let component: AutentificacionComponent;
  let fixture: ComponentFixture<AutentificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutentificacionComponent]
    });
    fixture = TestBed.createComponent(AutentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
