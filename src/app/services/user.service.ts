import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICocktail } from '../interfaces/cocktail';
import { IRecipe } from '../interfaces/recipe';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    items: Observable<any[]>;
    itemDoc: AngularFirestoreDocument<any> | undefined;
    cocktails: Observable <any[]> ;
    cocktaildoc:AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore, 
        private auth: AuthService) {
        this.items = this.angularFirestore.collection(`recipe`).valueChanges();
        this.cocktails = this.angularFirestore.collection(`cocktail`).valueChanges();
    }
    contactInfo(item: any){
        return this.angularFirestore.collection(`contact/`).doc().set(item);
    }
    saveUserInfo(user: IUser) {
        return this.angularFirestore.doc(`users/${this.auth.userID}`).set(user);
    }
    saveRecipeInfo(recipe: IRecipe) {
        return this.angularFirestore.collection("recipe").doc(recipe.id).set(recipe);
    }
    getRecipes() {
        return this.items;
    }

    delete(recipe: any) {
        this.itemDoc = this.angularFirestore.doc(`recipe/${recipe.id}`);
        this.itemDoc.delete();
    }
    saveCocktailInfo(cocktail: any){
        return this.angularFirestore.collection("cocktail").doc(cocktail.id).set(cocktail);
    }
    getCocktails() {
        return this.cocktails;
    }
    deleteCocktail(cocktail: any) {
        this.cocktaildoc = this.angularFirestore.doc(`cocktail/${cocktail.id}`);
        this.cocktaildoc.delete();
    }

}
