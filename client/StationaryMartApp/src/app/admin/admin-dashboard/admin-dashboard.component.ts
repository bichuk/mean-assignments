import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { AppError } from 'src/app/models/app.error';
import { OrderProduct } from 'src/app/models/order.product';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  error: boolean;
  errorMsg: string;

  constructor(private orderSvc: OrderService,
  private userSvc: UserService) { }
  orders : Array<any>

  ngOnInit() {
    this.getPendingOrders();    
  }

  getPendingOrders() {    
    this.orderSvc.getPendingOrders().subscribe((res) => {
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

  updateOrderStatus(order: any, orderStatus: string) {
    let params = {
      userId: order.userId,
      orderId: order.orderId,
      orderStatus: orderStatus      
    }

    this.orderSvc.updateOrderStatus(params).subscribe((res) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }   
      this.getPendingOrders();
    }, err => {
      this.showError('Failed to update the order!');
      console.log(err);
    });
  }
  showError(errorMsg: string) {
    this.error = true;
    this.errorMsg = errorMsg;
  }
}
