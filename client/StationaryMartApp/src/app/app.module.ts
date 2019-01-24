import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './home/dash-board/dash-board.component';
import { StationaryListComponent } from './stationary/stationary-list/stationary-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { LoginComponent } from './home/login/login.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    StationaryListComponent,
    OrderListComponent,
    LoginComponent,
    CartItemsComponent,
    AuthenticatedUserComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
