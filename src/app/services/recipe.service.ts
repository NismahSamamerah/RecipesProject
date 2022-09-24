import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IRecipe } from '../interfaces/recipe';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    itemDoc: AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore) { }


    saveRecipeInfo(recipe: IRecipe) {
        return this.angularFirestore.collection(`recipe`).doc(recipe.id).set(recipe);
    }
    getUserRecipes(user_id: string): Observable<any[]>{
        return this.angularFirestore.collection(`recipe`, ref => ref.where('user_id', '==', user_id)).valueChanges();
    }

    delete(recipe: IRecipe) {
        this.itemDoc = this.angularFirestore.doc(`recipe/${recipe.id}`);
        this.itemDoc.delete();
    }
}
