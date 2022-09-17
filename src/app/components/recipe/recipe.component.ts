import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {


  recipes : any = [];
  public recipe :string = '';
   recipeTitle :any ;

  constructor(public http: HttpClient, public route : Router , public apiService :ApiService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.apiService.getRecipesByName("fish").subscribe(
      (data: any) => {
        console.log(data);


          this.recipes = data ;
      },
      (error) => {
          console.log(error);
      }
  );}
  loadRecipe(): void {
    this.apiService.getRecipesByName(`${this.recipe}`).subscribe(
        (data: any) => {
          console.log(data);

            this.recipes = data ;
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
    getRecipeDetails(recipeTitle: string) {
        if (recipeTitle) {
            console.log(recipeTitle +"from recipe");
            this.route.navigate([`recipe-details/${recipeTitle}`], {
            })
        }
    }
    getRecipeDetails1(recipeTitle: string) {
        this.route.navigate([`/recipe-details`, {recipeTitle: recipeTitle}]);
    }
    goToUserRecipes() {
        this.route.navigate(['/user-recipe'])
    }

}
