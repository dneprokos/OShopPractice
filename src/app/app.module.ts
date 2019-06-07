import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatComponentsModule } from "./shared/angular-material/mat-components.module";


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { UserService } from './shared/services/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './shared/services/category.service';
import { ProductService } from './shared/services/product.service';
import { DataTableModule } from 'angular-6-datatable';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),  
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MatComponentsModule,
    CustomFormsModule,
    DataTableModule,    
    NgbModule.forRoot(),
    RouterModule.forRoot([
      //Anonymous users only
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component:  ShoppingCartComponent},
      { path: 'login', component: LoginComponent },
      //Logged in users only
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
      },
      //Admin users only
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [ AuthGuard, AdminAuthGuardService ] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [ AuthGuard, AdminAuthGuardService ] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [ AuthGuard, AdminAuthGuardService ] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [ AuthGuard, AdminAuthGuardService ] 
      },
    ]) 
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
