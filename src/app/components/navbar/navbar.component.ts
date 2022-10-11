import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public isLoggedIn: boolean | null = null;
    public name: string = '';


    constructor(public auth: AuthService,
        public route: Router,
        public userService: UserService) {
    }

    ngOnInit(): void {
        const sub = this.auth.user.subscribe((user) => {
            if (user) {
                this.isLoggedIn = true;
                this.auth.userID = user?.uid;
                const subUser = this.userService.getUserById(this.auth.userID as string).subscribe(res => {
                    for (const item of res) {
                        this.name = item.first_name + ' ' + item.last_name;
                    } subUser.unsubscribe();
                })
            } else {
                this.isLoggedIn = false;
            }

        });
    }

    goToUserRecipes() {
        this.route.navigate(['/user-recipe', { data: 'Recipe' }])
    }

    goToUserCocktail() {
        this.route.navigate(['/user-recipe', { data: 'Cocktail' }]);
    }

    logout() {
        this.auth.logout();
        this.route.navigate(['/login'])
        console.log('logout');
    }
}
