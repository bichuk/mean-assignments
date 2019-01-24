import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let mockOrderService;
  let mockUserService;  
  let pendingOrders;

  beforeEach(async(() => {
    pendingOrders = [
      {
          "products": [
              {
                  "productId": "5c32297028f0e02735361747",
                  "name": "Pen",
                  "price": "10",
                  "description": "it is a pen",
                  "quantity": "1"
              }
          ],
          "orderDate": "2019-01-21T20:12:54.127Z",
          "_id": "5c4627c6db0c427f0c4e24f8",
          "userId": "5c3dff3e1ba43a3c9291c1fc",
          "userName": "user1",
          "orderId": "5c4627c6db0c427f0c4e24f7",
          "orderStatus": "Pending",
          "orderStatusDate": null,
          "__v": 0
      },
      {
          "products": [
              {
                  "productId": "5c32297e28f0e02735361748",
                  "name": "Pencil",
                  "price": "5",
                  "description": "it is a pencil",
                  "quantity": "2"
              }
          ],
          "orderDate": "2019-01-21T20:13:05.328Z",
          "_id": "5c4627d1db0c427f0c4e24fa",
          "userId": "5c3dff3e1ba43a3c9291c1fc",
          "userName": "user1",
          "orderId": "5c4627d1db0c427f0c4e24f9",
          "orderStatus": "Pending",
          "orderStatusDate": null,
          "__v": 0
      }
  ];
    mockOrderService = jasmine.createSpyObj(['addItemToCart','getCartItems','updateCartItem','deleteCartItem'
                     ,'clearCart','placeOrder','getOrders','updateOrderItem','deleteOrderItem','deleteOrder'
                    ,'getPendingOrders','updateOrderStatus']);
    mockUserService = jasmine.createSpyObj(['login']);   

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ AdminDashboardComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: OrderService, useValue: mockOrderService }
      ],
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();  --VERY important line to be commented out.      
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return pending orders', () => {
    mockOrderService.getPendingOrders.and.returnValue(of(pendingOrders));
    fixture.detectChanges();    

    expect(fixture.componentInstance.orders.length).toBe(2);
  });

  it('should update order status to Approved', () => {

    let order = {
      userId: "5c3dff3e1ba43a3c9291c1fc",
      orderId: "5c4627c6db0c427f0c4e24f7"
    }

    mockOrderService.updateOrderStatus.and.returnValue(of(true));
    mockOrderService.getPendingOrders.and.returnValue(of(pendingOrders));

    mockOrderService.updateOrderStatus(order,'Approved');
    fixture.detectChanges();

    expect(fixture.componentInstance.orders.length).toBe(2);
  });

  it('should call updateOrderStatus', () => {

    let order = {
      userId: "5c3dff3e1ba43a3c9291c1fc",
      orderId: "5c4627c6db0c427f0c4e24f7"
    }

    mockOrderService.updateOrderStatus.and.returnValue(of(true));    

    mockOrderService.updateOrderStatus(order,'Approved');    

    expect(mockOrderService.updateOrderStatus).toHaveBeenCalled();
  });
});
