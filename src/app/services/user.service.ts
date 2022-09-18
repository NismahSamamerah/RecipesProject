import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/recipe';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    items: Observable<any[]>;
    itemDoc: AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) {
        this.items = this.angularFirestore.collection(`recipe`).valueChanges();
    }

    saveUserInfo(user: any) {
        return this.angularFirestore.doc(`users/${this.auth.userID}`).set(user);
    }
    saveRecipeInfo(recipe: any) {
        return this.angularFirestore.collection("recipe").doc(recipe.id).set(recipe);
    }
    getRecipes() {
        return this.items;
    }
    delete(recipe: any) {
        this.itemDoc = this.angularFirestore.doc(`recipe/${recipe.id}`);
        this.itemDoc.delete();
    }

}
