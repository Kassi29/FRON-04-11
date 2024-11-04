import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddartesanosComponent } from './addartesanos.component';

describe('AddartesanosComponent', () => {
  let component: AddartesanosComponent;
  let fixture: ComponentFixture<AddartesanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddartesanosComponent]
    });
    fixture = TestBed.createComponent(AddartesanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
