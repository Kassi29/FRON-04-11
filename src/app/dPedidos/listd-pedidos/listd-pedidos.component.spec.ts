import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdPedidosComponent } from './listd-pedidos.component';

describe('ListdPedidosComponent', () => {
  let component: ListdPedidosComponent;
  let fixture: ComponentFixture<ListdPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListdPedidosComponent]
    });
    fixture = TestBed.createComponent(ListdPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
