import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.products = this.db.collection('/products/');
  }

  create(product: Product){
    return this.products.add(product);
  }

  getAll(){
    return this.products.get();
  }

  get(docUid) {
    return this.products.doc<Product>(docUid).get();
  }

  update(docUid, product: Product) {
    return this.products.doc<Product>(docUid).update(product);
  }

  delete(docUid) {
    return this.products.doc<Product>(docUid).delete();
  }
}
