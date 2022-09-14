import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore, private auth: AuthService) {

   }

  saveUserInfo(user: any){
    return this.angularFirestore.doc(`users/${this.auth.userID}`).set(user);
  }
  saveRecipeInfo(recipe: any){
    return this.angularFirestore.collection("recipe").doc(recipe.id).set(recipe);
  }
 
}
