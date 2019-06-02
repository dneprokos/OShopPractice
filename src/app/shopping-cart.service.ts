import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { map, take} from 'rxjs/operators';
import { Product } from './models/product';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  carts: AngularFirestoreCollection<firebase.firestore.DocumentData>;

  constructor(private db: AngularFirestore) {
    this.carts = this.db.collection('/shopping-carts/');
  }

  private create(){
    return this.carts.add({ dateCreated: new Date().getTime() });
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.doc('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
      map(object => {
        let shoppingCart = object as ShoppingCart;
        return new ShoppingCart(shoppingCart.items);
      }
      )
    );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();      
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    const cartDocument: AngularFirestoreDocument<any> = await this.carts.doc(cartId);

     cartDocument.get().toPromise().catch().then(val => {
      let data = val.data() as ShoppingCart;

      if (data.items != undefined && data.items[product.uid] != undefined) {
        let field = 'items.' + product.uid + ".quantity";
        let currentQuantity = data.items[product.uid].quantity; 
        let updateQuantity = { [field]: currentQuantity + 1 };
        
        cartDocument.update(updateQuantity);        
      }
      else if (data.items != undefined && data.items[product.uid] == undefined) {
        let field = 'items.' + product.uid;
        let addNewProductToCart = {[field]: {product: product, quantity: 1 }};
        cartDocument.update(addNewProductToCart);
      }
      else if (data.items == undefined ) {
        const addNewProduct = { items: { [product.uid]: {product: product, quantity: 1 }}};
        cartDocument.update(addNewProduct);
      }
     });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    const cartDocument: AngularFirestoreDocument<any>  = await this.carts.doc(cartId);

    cartDocument.get().toPromise().catch().then(val => {
      let data = val.data() as ShoppingCart;

      if (data.items[product.uid].quantity > 1) {
        let field = 'items.' + product.uid + ".quantity";
        let currentQuantity = data.items[product.uid].quantity; 
        let updateQuantity = { [field]: currentQuantity - 1 };
        
        cartDocument.update(updateQuantity);        
      }
      else if (data.items[product.uid].quantity === 1) {
        let field2 = 'items.' + product.uid;
        cartDocument.update({ [field2]: firestore.FieldValue.delete() })
      }
     });
  }
}
