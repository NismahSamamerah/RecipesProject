import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';

import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
    @Input() recipe: IRecipe | undefined;
    @Input() cocktail: ICocktail | undefined;
    flag: boolean = false;

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private route: Router,
        private auth: AuthService,
        ) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {

    }

    deleteRecipe(recipe: any) {
        this.recipeService.delete(recipe);
    }

    getUserRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        console.log(recipe);
    }

    deleteCocktail(cocktail: any) {
        this.cocktailService.deleteCocktail(cocktail);
    }

    changeFlag (recipe: any){
        this.route.navigate(['/share', {data: JSON.stringify(recipe) }]);
    }

}
