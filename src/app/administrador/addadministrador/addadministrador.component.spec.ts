import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadministradorComponent } from './addadministrador.component';

describe('AddadministradorComponent', () => {
  let component: AddadministradorComponent;
  let fixture: ComponentFixture<AddadministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddadministradorComponent]
    });
    fixture = TestBed.createComponent(AddadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
