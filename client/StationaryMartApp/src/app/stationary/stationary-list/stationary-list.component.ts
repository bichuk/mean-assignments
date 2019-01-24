import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AppError } from 'src/app/models/app.error';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/order.product';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'stationary-list',
  templateUrl: './stationary-list.component.html',
  styleUrls: ['./stationary-list.component.css']
})
export class StationaryListComponent implements OnInit {
  products: Product[] = [];
  error: boolean;
  errorMsg: string;
  quantity: Number;  

  constructor(private productService: ProductService, 
              private router: Router, 
              private userSvc: UserService,
              private orderSvc: OrderService) { }

  ngOnInit() {
    this.productService.viewProducts().subscribe((res: Product[]) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }
      this.products = res;
    }, err => {
      this.showError('Failed to retrieve data!');
      console.log(err);
    });
  }

  showError(errorMsg: string) {
    this.error = true;
    this.errorMsg = errorMsg;
  }
  clearError() {
    this.error = false;
  }

  addToCart = (item: Product, qty: number) => {    
    
    if (qty <= 0){
      this.showError("Quantity cannot be 0!!");      
        return;
    }    

    let cartItem = new OrderProduct();
    cartItem.userId = this.userSvc.userProfile._id;
    cartItem.userName = this.userSvc.userProfile.userName;
    cartItem.productId = item._id;
    cartItem.name = item.name;
    cartItem.price = item.price;
    cartItem.description = item.description;
    cartItem.quantity = qty; 
        
    this.orderSvc.addItemToCart(cartItem).subscribe((res: OrderProduct) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }
      else
        this.router.navigateByUrl('/authenticated/cart');      
    }, err => {
      this.showError('Failed to add item to the cart!');
      console.log(err);
    });    
  }

  order = (product: Product, qty: number) => {   
    if (qty <= 0){
      this.showError("Quantity cannot be 0!!");      
        return;
    }    

    let products = [];
    let selectedProduct = {
      productId: product._id,
      name: product.name,
		  price: product.price,
		  description: product.description,
		  quantity: qty
    }
    products.push(selectedProduct);

    let params = {
      userId: this.userSvc.userProfile._id,
      userName: this.userSvc.userProfile.userName,
      products: products
    }
    this.orderSvc.placeOrder(params).subscribe((res) => {        
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }
      else    
        this.router.navigateByUrl('/authenticated/orderList');
    }, err => {
      this.showError('Failed to place the order!!');
      console.log(err);
    });
  }
}
