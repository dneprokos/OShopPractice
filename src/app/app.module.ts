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

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatComponentsModule } from './shared/angular-material/mat-components.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,        
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
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
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ]) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
