import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddeliveryComponent } from './adddelivery.component';

describe('AdddeliveryComponent', () => {
  let component: AdddeliveryComponent;
  let fixture: ComponentFixture<AdddeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddeliveryComponent]
    });
    fixture = TestBed.createComponent(AdddeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
