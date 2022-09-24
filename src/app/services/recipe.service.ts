import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { IRecipe } from '../interfaces/recipe';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    itemDoc: AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore , private auth :AuthService) { }


    saveRecipeInfo(recipe: IRecipe) {
        return this.angularFirestore.collection(`recipe`).doc(recipe.id).set(recipe);
    }
    getUserRecipes(user_id: string):   Observable<any[]>{
        return this.angularFirestore.collection(`recipe`, ref => ref.where('user_id', '==', user_id)).valueChanges();
    }

    delete(recipe: IRecipe) {
        this.itemDoc = this.angularFirestore.doc(`recipe/${recipe.id}`);
        this.itemDoc.delete();
    }
    update(recipe :any){
      console.log('1 ');
console.log(recipe);

      this.angularFirestore.collection(`recipe`, ref => ref.where('id' , '==', recipe.id as string)).ref.get().then((docs) => {
        console.log('2 ');
        docs.forEach(doc => {
          console.log(' 3');
          console.log(doc.get('title'));

            if (doc.get('user_id') == this.auth.userID && doc.get('id') == recipe.id) {
                this.angularFirestore.collection("recipe").doc(doc.id).update({
                  title: recipe.title,
                    instructions :recipe.instructions,
                    servings : recipe.servings,
                    ingredients : recipe.ingredients,
                });
// id
// "LH7k8wpI3"
// ingredients
// 0
// "cheese"
// instructions
// "nnnnnnnnnnnnnnnnnnnnnn"
// servings
// "1"
// title
// "pizza"
// user_id
// "UIWYc7Q1YT
            }
        });
    })
    }
  }

