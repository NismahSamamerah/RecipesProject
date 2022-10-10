import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IFavorite } from '../interfaces/favorite';

@Injectable({
	providedIn: 'root'
})
export class FavoriteService {

	favoriteDoc: AngularFirestoreDocument<any> | undefined;

	constructor(private angularFirestore: AngularFirestore) {}

	addFavorite(item: IFavorite) {
		return this.angularFirestore.collection('favorite').doc(item.id).set(item);
	}

	getFavoriteRecipe(user_id: string): Observable<any[]> {
		return this.angularFirestore.collection(`favorite`, ref => ref.where('typeS', '==', 'recipe').where('user_id', '==', user_id)).valueChanges();
	}

	getFavoriteCocktail(user_id: string): Observable<any[]> {
		return this.angularFirestore.collection(`favorite`, ref => ref.where('typeS', '==', 'cocktail').where('user_id', '==', user_id)).valueChanges();
	}

	getFavorites(user_id: string): Observable<any[]> {
    console.log(user_id);
		return this.angularFirestore.collection(`favorite`, ref => ref.where('user_id', '==', user_id)).valueChanges();
	}

	deleteFromFavorite(item: any ) {
		this.favoriteDoc = this.angularFirestore.doc(`favorite/${item.id}`);
		this.favoriteDoc.delete();
	}
}
