import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Utils } from '../common/utils';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class RatingService {
    
    constructor(private angularFirestore: AngularFirestore, 
        private auth: AuthService) {}

    saveRatingInfo(rating: any): void {
        let rated: boolean = false;
        this.angularFirestore.collection(`rating`, ref => ref.where('type_id', '==', rating.type_id)).ref.get().then((docs) => {
            docs.forEach(doc => {
                if (doc.get('user_id') == this.auth.userID && doc.get('type_id') == rating.type_id) {
                    this.angularFirestore.collection("rating").doc(doc.id).update({
                        rating: rating.rating
                    });
                    rated = true;
                }
            });
        }).then(() => {
            if (!rated) {
                this.angularFirestore.doc(`rating/${Utils.generateID()}`).set(rating);
            }
        });
    }

    getRecipeRating(recipeId: string): Observable<any[]> {
        return this.angularFirestore.collection(`rating`, ref => ref.where('type_id', '==', recipeId)).valueChanges();
    }

    getCocktailRating(cocktailId: string): Observable<any[]> {
        return this.angularFirestore.collection(`rating`, ref => ref.where('type_id', '==', cocktailId)).valueChanges();
    }


}