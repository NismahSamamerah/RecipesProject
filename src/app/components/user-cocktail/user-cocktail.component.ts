import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-cocktail',
    templateUrl: './user-cocktail.component.html',
    styleUrls: ['./user-cocktail.component.css']
})
export class UserCocktailComponent implements OnInit {
    cocktails: any[] = [];
    constructor(public route: Router,
        private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getCocktails().subscribe(cocktails => {
            this.cocktails = cocktails;
        });
    }
    addNewCocktail(type: string) {
        if (type) {
            this.route.navigate([`/recipe-form`, { id: type }])
        }
    }
    deleteCocktail(cocktail: ICocktail) {
        this.userService.deleteCocktail(cocktail);
    }


}
