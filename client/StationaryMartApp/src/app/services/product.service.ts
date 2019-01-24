import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AppError } from '../models/app.error';
import { Product } from '../models/product';
import { ServerConfig } from '../common/enpoint-config';
import { OrderProduct } from '../models/order.product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  server = new ServerConfig();
  appError: AppError = new AppError();
  cartItems: OrderProduct[] = [];
  
  constructor(public http: HttpClient) {
  }

  viewProducts(): Observable<Product[] | AppError> {
    return this.http.get<Product[]>(this.server.url + `/stationary`)
      .pipe(
        catchError(err => this.appError.handleError(err))
      );
  }

  
}


