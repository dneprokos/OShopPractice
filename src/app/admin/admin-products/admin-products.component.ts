import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  allProducts: Product [];
  filteredProducts: Product [];
  subscription: Subscription;

  displayedColumns = ['title', 'price', 'edit'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.allProducts);
  isAscending: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private productService: ProductService) {
    this.allProducts = [];

    this.subscription = this.productService.getAll()
    .subscribe(
      query => {
        query.docChanges().map(
          doc => {
            let product = doc.doc.data() as Product;
            product.uid = doc.doc.id;

            this.allProducts.push(product);
            this.filteredProducts = this.allProducts;
            this.dataSource = new MatTableDataSource(this.filteredProducts);
            this.dataSource.paginator = this.paginator;
          }
        )
      }
    ) 
  }

  filter(query: string) {
    console.log(this.allProducts);
    this.filteredProducts = (query) ?
      this.allProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.allProducts;

    this.dataSource = new MatTableDataSource(this.filteredProducts);
    this.dataSource.paginator = this.paginator;
  }

  sortByPrice(isAscending: boolean){
    this.dataSource = new MatTableDataSource<Product>(this.priceSorting(isAscending));
    this.dataSource.paginator = this.paginator;
    this.isAscending = isAscending;
  }

  priceSorting(isAscending: boolean){
    let ascSort = this.filteredProducts.sort((a, b) => a.price - b.price);

    if (isAscending === true){
       return ascSort; 
    }
    else{
       return ascSort.reverse();     
    }   
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
