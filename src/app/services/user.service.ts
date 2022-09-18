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
    items: Observable<any[]>;
    itemDoc: AngularFirestoreDocument<any> | undefined;
favorites : Observable<any[]> ;
favoriteDoc :AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) {
        this.items = this.angularFirestore.collection(`recipe`).valueChanges();
        this.favorites = this.angularFirestore.collection(`favorite`).valueChanges();
    }

  saveUserInfo(user: IUser){
    return this.angularFirestore.doc(`users/${this.auth.userID}`).set(user);
  }
  saveRecipeInfo(recipe: IRecipe){
    return this.angularFirestore.collection("recipe").doc(recipe.id).set(recipe);
  }
  getRecipes() {
    return this.items;
}
  addFavorite(item : IFavorite){
    return this.angularFirestore.collection('favorite').doc().set(item);
  }
  getFavorite(){
    return this.favorites;
  }
  delete(recipe: any) {
    this.itemDoc = this.angularFirestore.doc(`recipe/${recipe.id}`);
    this.itemDoc.delete();
}
  deleteFromFavorite(item : any){
    console.log("from serves");
    this.favoriteDoc = this.angularFirestore.doc(`favorite/${item.type_id}`);
    this.favoriteDoc.delete();
  }

}
