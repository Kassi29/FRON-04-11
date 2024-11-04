import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcPedidosComponent } from './listc-pedidos.component';

describe('ListcPedidosComponent', () => {
  let component: ListcPedidosComponent;
  let fixture: ComponentFixture<ListcPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcPedidosComponent]
    });
    fixture = TestBed.createComponent(ListcPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
