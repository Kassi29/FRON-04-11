import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductoComponent } from './addproducto.component';

describe('AddproductoComponent', () => {
  let component: AddproductoComponent;
  let fixture: ComponentFixture<AddproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductoComponent]
    });
    fixture = TestBed.createComponent(AddproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
