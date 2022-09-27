import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IFavorite } from 'src/app/interfaces/favorite';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { IRecipe } from 'src/app/interfaces/recipe';
import { Utils } from 'src/app/common/utils';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipes: any = [];
    public recipe: string = '';
    totalPages: number[] = [];
    currentPage: number = 1;

    constructor(
        public http: HttpClient,
        public route: Router,
        public apiService: ApiService,
        private auth: AuthService,
        private favorite: FavoriteService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
        this.apiService.getRecipesByName('fish').subscribe(
            (data: any) => {
                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    loadRecipe(): void {
        this.apiService.getRecipesByName(`${this.recipe}`).subscribe(
            (data: any) => {
                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }


    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    }
    goToUserRecipes() {
        this.route.navigate(['/user-recipe' , { data: 'Recipe' }])
    }
    addFavorite(recipe: IRecipe) {

        const favoriteItem: IFavorite = {
            id: Utils.generateID(),
            type_id: recipe.title,
            user_id: this.auth.userID,
            typeS: 'recipe',
            type: recipe,
        }
        console.log(favoriteItem);
        this.favorite.addFavorite(favoriteItem).then(res => {

        }).catch(err => {
            console.log(err);
        })
    }
}
