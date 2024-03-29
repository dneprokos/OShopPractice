import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component:  ShoppingCartComponent},
      { 
        path: 'check-out', 
        component: CheckOutComponent, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'order-success/:id', 
        component: OrderSuccessComponent, 
        canActivate: [AuthGuard] 
      },      
      { 
        path: 'my/orders', 
        component: MyOrdersComponent, 
        canActivate: [AuthGuard] 
      }
    ])
  ]
})
export class ShoppingModule { }
