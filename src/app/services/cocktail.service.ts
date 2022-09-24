import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICocktail } from '../interfaces/cocktail';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    cocktailDoc: AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore , private auth :AuthService) { }

    saveCocktailInfo(cocktail: ICocktail) {
        return this.angularFirestore.collection(`cocktail`).doc(cocktail.id).set(cocktail);
    }

    getUserCocktails(user_id: string): Observable<any[]> {
        return this.angularFirestore.collection(`cocktail`, ref => ref.where('user_id', '==', user_id)).valueChanges();
    }

    deleteCocktail(cocktail: ICocktail) {
        this.cocktailDoc = this.angularFirestore.doc(`cocktail/${cocktail.id}`);
        this.cocktailDoc.delete();
    }
    update(cocktail :any){
      this.angularFirestore.collection(`cocktail`, ref => ref.where('id' , '==', cocktail.id as string)).ref.get().then((docs) => {
        docs.forEach(doc => {
            if (doc.get('user_id') == this.auth.userID && doc.get('id') == cocktail.id) {
                this.angularFirestore.collection("cocktail").doc(doc.id).update({
                  name: cocktail.name,
                    instructions :cocktail.instructions,
                    ingredients : cocktail.ingredients,
                });
            }
        });
    })
    }
}
