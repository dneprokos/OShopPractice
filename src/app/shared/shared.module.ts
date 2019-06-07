import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    AdminAuthGuardService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }