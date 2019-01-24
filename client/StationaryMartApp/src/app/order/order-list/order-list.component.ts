import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { AppError } from 'src/app/models/app.error';
import { OrderProduct } from 'src/app/models/order.product';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  error: boolean;
  errorMsg: string;

  constructor(private orderSvc: OrderService,
    private userSvc: UserService) { }
  orders : Array<any>

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    let userId = this.userSvc.userProfile._id;
    this.orderSvc.getOrders(userId).subscribe((res) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }         
     this.orders = res;     
    }, err => {
      this.showError('Failed to add item to the cart!');
      console.log(err);
    });
  }

  updateOrderItem(product: OrderProduct, order: any) {
    let params = {
      userId: this.userSvc.userProfile._id,
      orderId: order.orderId,
      productId: product.productId,
      quantity: product.quantity
    }

    this.orderSvc.updateOrderItem(params).subscribe((res) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      console.log('Order has been updated successfully!');
      this.getOrders();
    }, err => {
      this.showError('Failed to update the order!');
      console.log(err);
    });
  }

  deleteOrderItem(product: OrderProduct, order: any) {    
    let params = {
      userId: this.userSvc.userProfile._id,
      orderId: order.orderId,
      productId: product.productId
    }

    this.orderSvc.deleteOrderItem(params).subscribe((res) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }         
      console.log('Order has been updated successfully!');
      this.getOrders();             
    }, err => {
      this.showError('Failed to update the order!');
      console.log(err);
    });
  }

  deleteOrder(order: any) {    
    let params = {
      userId: this.userSvc.userProfile._id,
      orderId: order.orderId      
    }

    this.orderSvc.deleteOrder(params).subscribe((res) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }         
      console.log('Order has been deleted successfully!');
      this.getOrders();             
    }, err => {
      this.showError('Failed to delete the order!');
      console.log(err);
    });
  }

  showError(errorMsg: string) {
    this.error = true;
    this.errorMsg = errorMsg;
  }

}
