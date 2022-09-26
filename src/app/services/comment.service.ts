import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private angularFirestore: AngularFirestore) {}

    saveCommentInfo(comment: any) {
        return this.angularFirestore.collection("comment").doc(comment.id).set(comment);
    }
    
    getRecipeComments(recipeId: string): Observable<any[]> {
        return this.angularFirestore.collection(`comment`, ref => ref.where('type', '==', 'Recipe').where('type_id', '==', recipeId)).valueChanges();
    }
    
    getCocktailComments(cocktailId: string): Observable<any[]> {
        return this.angularFirestore.collection(`comment`, ref => ref.where('type', '==', 'Cocktail').where('type_id', '==', cocktailId)).valueChanges();
    }
    

}
