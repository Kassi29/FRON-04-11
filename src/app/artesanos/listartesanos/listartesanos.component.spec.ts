import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListartesanosComponent } from './listartesanos.component';

describe('ListartesanosComponent', () => {
  let component: ListartesanosComponent;
  let fixture: ComponentFixture<ListartesanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListartesanosComponent]
    });
    fixture = TestBed.createComponent(ListartesanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
