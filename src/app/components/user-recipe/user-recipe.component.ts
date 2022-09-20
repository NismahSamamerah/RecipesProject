import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRecipe } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-recipe',
    templateUrl: './user-recipe.component.html',
    styleUrls: ['./user-recipe.component.css']
})
export class UserRecipeComponent implements OnInit {

    recipes: IRecipe[] = [];
    searchValue: string = ''

    recipesSearch: IRecipe[] = [];


    constructor(public route: Router,
        private userService: UserService) { }

    ngOnInit(): void {
        this.recipesSearch;
        this.userService.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });
    }

    searchByName() {

        this.recipesSearch = [];
        for (let recipe of this.recipes) {
            if (recipe.title.includes(this.searchValue)) {
                this.recipesSearch.push(recipe);
            }
        }
        this.recipes = [];
    }

    addNewRecipe(type: string) {
        if (type) {
            this.route.navigate(["/recipe-form", { id: type }])
        }
    }
    deleteRecipe(recipe: IRecipe) {
        this.userService.delete(recipe);
    }
    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
    }
}
