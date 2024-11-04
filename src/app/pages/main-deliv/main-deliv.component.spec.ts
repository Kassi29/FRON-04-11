import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDelivComponent } from './main-deliv.component';

describe('MainDelivComponent', () => {
  let component: MainDelivComponent;
  let fixture: ComponentFixture<MainDelivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainDelivComponent]
    });
    fixture = TestBed.createComponent(MainDelivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
