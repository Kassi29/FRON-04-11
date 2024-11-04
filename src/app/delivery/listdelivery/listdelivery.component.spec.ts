import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdeliveryComponent } from './listdelivery.component';

describe('ListdeliveryComponent', () => {
  let component: ListdeliveryComponent;
  let fixture: ComponentFixture<ListdeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListdeliveryComponent]
    });
    fixture = TestBed.createComponent(ListdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
