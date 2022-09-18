import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IFavorite } from '../interfaces/favorit';
import { IRating } from '../interfaces/rating';
import { IRecipe } from '../interfaces/recipe';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
favorites : Observable<any[]> ;
favoriteDoc :AngularFirestoreDocument<any> | undefined;

  constructor(private angularFirestore: AngularFirestore, private auth: AuthService) {
    this.favorites = this.angularFirestore.collection(`favorite`).valueChanges();
  }

  saveUserInfo(user: IUser){
    return this.angularFirestore.doc(`users/${this.auth.userID}`).set(user);
  }
  saveRecipeInfo(recipe: IRecipe){
    return this.angularFirestore.collection("recipe").doc(recipe.id).set(recipe);
  }
  addFavorite(item : IFavorite){
    return this.angularFirestore.collection('favorite').doc().set(item);
  }
  getFavorite(){
    return this.favorites;
  }
  deleteFromFavorite(item : any){
    console.log("from serves");
    this.favoriteDoc = this.angularFirestore.doc(`favorite/${item.type_id}`);
    this.favoriteDoc.delete();
  }

}
