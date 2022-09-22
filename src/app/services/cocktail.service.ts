import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICocktail } from '../interfaces/cocktail';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    cocktailDoc: AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore) { }

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
}
