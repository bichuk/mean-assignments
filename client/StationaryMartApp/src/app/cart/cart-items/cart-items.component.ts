import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/models/order.product';
import { OrderService } from 'src/app/services/order.service';
import { AppError } from 'src/app/models/app.error';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  cartItems: OrderProduct[] = [];
  error: boolean;
  errorMsg: string;
  constructor(private orderSvc: OrderService,
              private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    let userId = this.userSvc.userProfile._id;
    this.orderSvc.getCartItems(userId).subscribe((res: OrderProduct[]) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }    
     this.cartItems = res; 
    }, err => {
      this.showError('Failed to add item to the cart!');
      console.log(err);
    });
  }
  update(cartItem: OrderProduct) {
    let params = {
      userId: this.userSvc.userProfile._id,
      productId: cartItem.productId,
      quantity: cartItem.quantity
    }
    
    this.orderSvc.updateCartItem(params).subscribe((res: OrderProduct) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      console.log('Updated successfully!');
      this.getCartItems();             
    }, err => {
      this.showError('Failed to edit cart!');
      console.log(err);
    });
  }
  delete(cartItem: OrderProduct) {
    let params = {
      userId: this.userSvc.userProfile._id,
      productId: cartItem.productId
    }
    
    this.orderSvc.deleteCartItem(params).subscribe((res: OrderProduct) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      console.log('Deleted successfully!');
      this.getCartItems();            
    }, err => {
      this.showError('Failed to delete cart item!');
      console.log(err);
    });
  }

  placeOrder() {
    let params = {
      userId: this.userSvc.userProfile._id,
      userName: this.userSvc.userProfile.userName,
      products: this.cartItems
    }

    this.orderSvc.placeOrder(params).subscribe((res: OrderProduct) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      console.log('Order has been placed successfully!!!');
      this.router.navigateByUrl('/authenticated/orderList');             
    }, err => {
      this.showError('Failed to place the order!!');
      console.log(err);
    });
  }
  emptyCart() {
    let params = {
      userId: this.userSvc.userProfile._id,
    }

    this.orderSvc.clearCart(params).subscribe((res: OrderProduct) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      console.log('Cart has been cleared!!!'); 
      this.getCartItems();                        
    }, err => {
      this.showError('Failed to clear the cart!!');
      console.log(err);
    });
  }
  showError(errorMsg: string) {
    this.error = true;
    this.errorMsg = errorMsg;
  }
}
