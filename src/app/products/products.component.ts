import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  allProducts: Product [] = [];
  filteredProducts: Product [] = [];
  category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) 
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
