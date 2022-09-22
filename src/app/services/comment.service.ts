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
        return this.angularFirestore.collection(`comment`, ref => ref.where('type', '==', 'recipe').where('type_id', '==', recipeId)).valueChanges();
    }
    
    getCocktailComments(cocktailId: string): Observable<any[]> {
        return this.angularFirestore.collection(`comment`, ref => ref.where('type', '==', 'cocktail').where('type_id', '==', cocktailId)).valueChanges();
    }
    

}
