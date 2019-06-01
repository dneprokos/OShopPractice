import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  cart: any;
  allProducts: Product [] = [];
  filteredProducts: Product [] = [];
  category: string;
  subscription: Subscription;

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) 
  {
    this.productService.getAll()
    .subscribe(
      query => {
        query.docChanges().map(
          doc => {
            let product = doc.doc.data() as Product;
            product.uid = doc.doc.id;

            this.allProducts.push(product);

            route.queryParamMap.subscribe(params => {
              this.category = params.get('category');
              this.filteredProducts = (this.category) ?
                this.allProducts.filter(p => p.category === this.category) : 
                this.allProducts; 
            });
          }
        )
      }
    )  
  }

}
