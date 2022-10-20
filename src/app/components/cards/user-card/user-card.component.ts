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
import Swal from 'sweetalert2';
import { UserRecipeComponent } from '../../user-recipe/user-recipe.component';


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
        public userRecipeComponent: UserRecipeComponent
    ) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {

    }
    deleteAlert(recipe: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d54215',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (recipe.hasOwnProperty('title')) {
                    this.deleteRecipe(recipe);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } else {
                    this.deleteCocktail(recipe);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            }
        })
    }

    deleteRecipe(recipe: IRecipe) {
        this.userRecipeComponent.deleteRecipe(recipe)
        this.recipeService.delete(recipe);
    }

    deleteCocktail(cocktail: ICocktail) {
        this.userRecipeComponent.deleteCocktail(cocktail)
        this.cocktailService.deleteCocktail(cocktail);
    }

    getUserRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        console.log(recipe);
    }

    changeFlag(recipe: any) {
        this.route.navigate(['/share', { data: JSON.stringify(recipe) }]);
    }

}
