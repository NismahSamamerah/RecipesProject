import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

    recipes: any = [];
    public recipeTitleForDitals :any = 'asdf';

    constructor(public http: HttpClient, public route: Router, public apiService: ApiService) {
    }
    ngOnInit(): void {
        this.getRecipes();
    }

    getRecipes() {
        this.apiService.getRecipesByName("fish").subscribe((data) => {
            this.recipes = data;
            return this.recipes;

        }, (error) => {
            console.log(error);
        });
    }

    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        });
    }
    getRecipeDetails(recipeTitle: string) {
        if (recipeTitle) {
            console.log(recipeTitle);
            this.recipeTitleForDitals=recipeTitle
            this.route.navigate([`recipe-details/${recipeTitle}`])
        }
    }
    goToUserRecipes() {
        this.route.navigate(['/user-recipe'])
    }
}
