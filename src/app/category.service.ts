import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore, private altDb: AngularFireDatabase) { }

  getAll(): AngularFirestoreCollection<Category> {
    return this.db.collection("/categories/");
  }

}
