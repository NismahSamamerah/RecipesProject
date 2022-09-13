import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'recipesProject';

    // constructor(public auth:AuthService, private userService: UserService){


    //   this.auth.user.subscribe(user => {
    //     this.auth.userID = user?.uid;
    //     console.log(user?.uid);
    //   });



    //   this.auth.register(user.email, user.password).then(res => {
    //     this.userService.saveUserInfo(user).then(res => {
    //       console.log(res);
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   }).catch(err => {
    //     console.log(err);
    //   })



    // this.auth.logout().then(() => {
    //   console.log('out');
    // }).catch(() => {
    //   console.log('Error');
    // })





    ngOnInit(): void {

    }
}
