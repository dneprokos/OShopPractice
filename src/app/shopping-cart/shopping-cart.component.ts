import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<{}>;
  shoppingCartItemsCount: number;
  productIds: string[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

    this.cart$.subscribe(cart => {
      this.shoppingCartItemsCount = 0;
      for(let productId in cart.items){
       this.shoppingCartItemsCount += cart.items[productId].quantity;
      }
    });

    this.cart$.subscribe(cart => {
      this.productIds = Object.keys(cart.items);
    })
  }

}
