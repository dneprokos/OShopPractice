import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;
  

  constructor(private categoryService: CategoryService,) {
    this.categories$ = categoryService.getAll().valueChanges()
    .pipe(
      map(arr => Object.entries(arr.shift()))
    )
   }
}
