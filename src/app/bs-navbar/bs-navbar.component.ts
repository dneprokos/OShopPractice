import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemsCount: number;

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemsCount = 0;
      for(let productId in cart.items){
       this.shoppingCartItemsCount += cart.items[productId].quantity;
      }
    });
  }
  appUser: AppUser;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
  }



  logout() {
    this.auth.logout();
  }

}
