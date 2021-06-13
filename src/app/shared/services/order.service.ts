import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: AngularFirestoreCollection<firebase.firestore.DocumentData>;

  constructor(private db: AngularFirestore, private shoppingCartService: ShoppingCartService) {
    this.orders = this.db.collection("/orders/");
  }

  async placeOrder(order: Order): Promise<firebase.firestore.DocumentReference> {
    var data = JSON.parse(JSON.stringify(order)); //Workaround because of bug in firestore.
    let result = await this.orders.add(data);
    this.shoppingCartService.clearCart();
    return result;

    //TODO: Review how to make it with help of transaction. It will be much save implementation.
  }

  getOrdersByUser(userId: string): Promise<Order []> {
    return this.orders.ref.where('userId', '==', userId)
    .get().then(q => q.docs.map(v => v.data() as Order));      
  }
}
