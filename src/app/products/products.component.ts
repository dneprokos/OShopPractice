import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  allProducts: Product [] = [];
  filteredProducts: Product [] = [];
  category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();    
  }

  private populateProducts(){
    let x: ShoppingCart;
  


    this.productService.getAll()
    .subscribe(
      query => {
        query.docChanges()
        .map(
          doc => {
            let product = doc.doc.data() as Product;
            product.uid = doc.doc.id;

            this.allProducts.push(product);

            this.route.queryParamMap.subscribe(params => {
              this.category = params.get('category');
               this.applyFilter();
            });
          }
        )
      }
    ) 
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
                this.allProducts.filter(p => p.category === this.category) : 
                this.allProducts;
  }


  

}
