import { Injectable, OnInit } from '@angular/core';
import { OrderProduct } from '../models/order.product';
import { AppError } from '../models/app.error';
import { ServerConfig } from '../common/enpoint-config';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  server = new ServerConfig();
  appError: AppError = new AppError();
  
  constructor(private http: HttpClient) { }

  addItemToCart(product: OrderProduct): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/cart/addToCart`, product, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }

  getCartItems(userId: string): Observable<OrderProduct[] | AppError> {
    return this.http.get<OrderProduct[]>(this.server.url + `/cart/viewEmployeeCart/${userId}`)
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  }

  updateCartItem(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/cart/updateCartItem`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }

  deleteCartItem(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/cart/deleteCartItem`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }

  clearCart(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/cart/clearCart`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }

  placeOrder(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/order/placeOrder`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }
  getOrders(userId: string): Observable<any | AppError> {
    return this.http.get<any>(this.server.url + `/order/viewEmployeeOrders/${userId}`)
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  }
  updateOrderItem(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/order/updateOrderItem`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }
  deleteOrderItem(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/order/deleteOrderItem`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }
  deleteOrder(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/order/deleteOrder`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }
  getPendingOrders(): Observable<any | AppError> {
    return this.http.get<any>(this.server.url + `/admin`)
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  }
  updateOrderStatus(params: any): Observable<OrderProduct | AppError> {
    return this.http.post<OrderProduct>(this.server.url + `/admin/updateOrderStatus`, params, httpOptions)
      .pipe(       
        catchError(err => this.appError.handleError(err))
      );
  }
}
