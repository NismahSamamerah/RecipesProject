import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.default.User | null>;
  public userID: string | undefined;

  constructor(private angularFireAuth: AngularFireAuth){
    this.user = angularFireAuth.user;
  }

  register(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.angularFireAuth.signOut();
  }

}
