import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { environment } from 'src/environments/environment';

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { MatComponentsModule } from './shared/angular-material/mat-components.module';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from './shared/shared.module';



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
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
