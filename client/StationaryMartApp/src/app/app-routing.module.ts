import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './home/dash-board/dash-board.component';
import { LoginComponent } from './home/login/login.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
{  path: 'login', component: LoginComponent },
{  path: 'authenticated', component: AuthenticatedUserComponent, canActivate: [AuthGuardService],
   children : 
   [
      {  path: '', canActivateChild : [AuthGuardService], children: [
        {  path: '',  redirectTo: 'dash-board', pathMatch: 'full' },
        {  path: 'dash-board',  component: DashBoardComponent },
        {  path: 'cart',  component: CartItemsComponent },
        {  path: 'orderList',  component: OrderListComponent },
        {  path: 'admin-dash-board',  component: AdminDashboardComponent },
        {  path: 'logout',  component: LoginComponent }
      ] },      
   ]},
{  path: '',  component: LoginComponent },
{  path: '**',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
