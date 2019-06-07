import { Component } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  

  categories$;
  product = {} as Product;
  id;
  subscription: Subscription;
  isNew: boolean;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) 
  {
    this.categories$ = categoryService.getAll().valueChanges()
    .pipe(
      map(arr => Object.entries(arr.shift()))
    )

    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.isNew = true;
      this.subscription = this.productService
      .get(this.id)
      .subscribe(p => {
      this.product = p.data() as Product;
    }) 
    }
    else {
      this.isNew = false;
    } 
  }


  save(product) {

    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }      
  }
}
