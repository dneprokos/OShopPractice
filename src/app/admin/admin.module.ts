import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-6-datatable';
import { MatComponentsModule } from '../shared/angular-material/mat-components.module';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
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
      }
    ])
  ],
  exports: [

  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
