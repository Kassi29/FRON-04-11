import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductoComponent } from './listproducto.component';

describe('ListproductoComponent', () => {
  let component: ListproductoComponent;
  let fixture: ComponentFixture<ListproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListproductoComponent]
    });
    fixture = TestBed.createComponent(ListproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
