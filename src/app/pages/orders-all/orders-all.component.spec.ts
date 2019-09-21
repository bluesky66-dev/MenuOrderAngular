import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAllComponent } from './orders-all.component';

describe('OrdersAllComponent', () => {
  let component: OrdersAllComponent;
  let fixture: ComponentFixture<OrdersAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
