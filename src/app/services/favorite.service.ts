import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IFavorite } from '../interfaces/favorite';

@Injectable({
	providedIn: 'root'
})
export class FavoriteService {
	favorites: Observable<any[]>;
	favoriteDoc: AngularFirestoreDocument<any> | undefined;


	constructor(private angularFirestore: AngularFirestore) {
		this.favorites = this.angularFirestore.collection(`favorite`).valueChanges();
	}
	addFavorite(item: IFavorite) {
		return this.angularFirestore.collection('favorite').doc(item.id).set(item);
	}
	getFavorite() {
		return this.favorites;
	}
	deleteFromFavorite(item: any) {
		console.log("from serves");
		this.favoriteDoc = this.angularFirestore.doc(`favorite/${item.id}`);
		this.favoriteDoc.delete();
	}
}
