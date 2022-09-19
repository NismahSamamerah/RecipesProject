import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ApiService } from 'src/app/services/api.service';
import { IFavorite } from 'src/app/interfaces/favorit';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {


    recipes: any = []
    public recipe: string = '';

    recipeTitle: any;


    constructor(
        public http: HttpClient,
        public route: Router,
        public apiService: ApiService,
        private user: UserService,
        private auth : AuthService) {
    }
    ngOnInit(): void {
        this.apiService.getRecipesByName("fish").subscribe(
            (data: any) => {
                this.recipes = data;
                console.log(this.recipes);
            },
            (error) => {
                console.log(error);
            }
        );
        // this.apiService.getImages('fish').subscribe()
        console.log(this.apiService.getImages('fish'));
    }
    loadRecipe(): void {
        this.apiService.getRecipesByName(`${this.recipe}`).subscribe(
            (data: any) => {
                console.log(data);

                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        });
    }
    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
    }

    goToUserRecipes() {
        this.route.navigate(['/user-recipe'])
    }

    addFavorite(title :string){
      const favoriteItem: IFavorite = {
        type_id: title,
        user_id: this.auth.userID,
        type: 'recipe'
      }
      this.user.addFavorite(favoriteItem).then(res => {
        console.log(favoriteItem);
    }).catch(err => {
        console.log(err);
    })
    }
}
