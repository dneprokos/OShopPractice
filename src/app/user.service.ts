import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: AngularFirestoreCollection<AppUser>;
  private userDoc: AngularFirestoreDocument<AppUser>;

  constructor(private db: AngularFirestore, private altDb: AngularFireDatabase) {
    //Get users collection
    this.users = this.db.collection<AppUser>('users');
  }

  save(user: firebase.User){
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true })
    .then(() =>console.log('user saved successfully'))
    .catch((reason: any) => console.log('user save failed:', reason));  
  }

  get(uid: string) {
    return this.db.doc<AppUser>('/users/' + uid);
  }
}
