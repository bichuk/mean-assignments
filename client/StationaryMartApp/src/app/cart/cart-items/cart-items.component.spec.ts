import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsComponent } from './cart-items.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

describe('CartItemsComponent', () => {
  let component: CartItemsComponent;
  let fixture: ComponentFixture<CartItemsComponent>;
  let mockOrderService;
  let mockUserService;  
  let cartItems;

  beforeEach(async(() => {
    cartItems = [
      {
          "productId": "5c32297028f0e02735361747",
          "name": "Pen",
          "price": "10",
          "description": "it is a pen",
          "quantity": "1"
      }
  ];
    mockOrderService = jasmine.createSpyObj(['addItemToCart','getCartItems','updateCartItem','deleteCartItem'
                     ,'clearCart','placeOrder','getOrders','updateOrderItem','deleteOrderItem','deleteOrder'
                    ,'getPendingOrders','updateOrderStatus']);
    mockUserService = jasmine.createSpyObj(['login', ["userProfile"]]);//Mocking the property inside the service.   

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ CartItemsComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: OrderService, useValue: mockOrderService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return cart items', () => {
    mockOrderService.getCartItems.and.returnValue(of(cartItems));     
     
    fixture.detectChanges();    

    expect(fixture.componentInstance.cartItems.length).toBe(1);
  });

  it('should call update cart item', () => {

    let cartItem = {
      userId: "5c3dff511ba43a3c9291c1fd",
      productId: "5c32297028f0e02735361747",
      quantity: 1
    }

    mockOrderService.updateCartItem.and.returnValue(of(true));    

    mockOrderService.updateCartItem(cartItem);    

    expect(mockOrderService.updateCartItem).toHaveBeenCalled();
  });

  it('should call delete cart item', () => {

    let cartItem = {
      userId: "5c3dff511ba43a3c9291c1fd",
      productId: "5c32297028f0e02735361747"
    }

    mockOrderService.deleteCartItem.and.returnValue(of(true));    

    mockOrderService.deleteCartItem(cartItem);    

    expect(mockOrderService.deleteCartItem).toHaveBeenCalled();
  });

  it('should call place order', () => {

    let order = {
      userId: "5c3dff511ba43a3c9291c1fd",
      userName: "5c32297028f0e02735361747",
      products:[{
        "userId": "5c3dff511ba43a3c9291c1fd",
        "userName":"user1",
        "products":[
          {
            "productId": "5c32297028f0e02735361747",
            "name":"test",
            "price":100,
            "description":"test",
            "quantity":12
          }
          ]
      }]
    }

    mockOrderService.placeOrder.and.returnValue(of(true));    

    mockOrderService.placeOrder(order);    

    expect(mockOrderService.placeOrder).toHaveBeenCalled();
  });
});
