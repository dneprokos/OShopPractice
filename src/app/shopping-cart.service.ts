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

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    const cartDocument: AngularFirestoreDocument<any> = await this.carts.doc(cartId);

     cartDocument.get().toPromise().catch().then(val => {
      let data = val.data() as ShoppingCart;

      //Update products quantity
      if (data.items[product.uid]) {
        this.updateProductQuantity(product, data, cartDocument, +1);        
      }
      //Add new product to cart
      else if (data.items[product.uid] == undefined) {
        let field = 'items.' + product.uid;
        let addNewProductToCart = this.newProductObject(product, field);
        cartDocument.update(addNewProductToCart);
      }
     });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    const cartDocument: AngularFirestoreDocument<any>  = await this.carts.doc(cartId);

    cartDocument.get().toPromise().catch().then(val => {
      let data = val.data() as ShoppingCart;

      if (data.items[product.uid].quantity > 1) {
        this.updateProductQuantity(product, data, cartDocument, -1);       
      }
      else if (data.items[product.uid].quantity === 1) {
        let field2 = 'items.' + product.uid;
        cartDocument.update({ [field2]: firestore.FieldValue.delete() })
      }
     });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    const cartDocument: AngularFirestoreDocument<any>  = await this.carts.doc(cartId);
    cartDocument.update({ items: {} });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();      
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private create(){
    return this.carts.add({ 
      dateCreated: new Date().getTime(), 
      items: {}
    });
  }

  private updateProductQuantity(product: Product, data: ShoppingCart, document: AngularFirestoreDocument<any>, value: number){
    let field = 'items.' + product.uid + ".quantity";
        let currentQuantity = data.items[product.uid].quantity; 
        let updateQuantity = { [field]: currentQuantity + value };
        
        document.update(updateQuantity);
  }

  private newProductObject(product: Product, fieldName: string){
    return {
      [fieldName]: {
        title: product.title,
        imageUrl:product.imageUrl,
        price: product.price,
        quantity: 1 
      }};
  }

  
}
