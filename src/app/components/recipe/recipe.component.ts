import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipes : any = [];
  public item :string = '';

  constructor(public http: HttpClient, public route : Router , public apiService :ApiService) {
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
  );
    this.loadRecipe();
  }


getRecipeDetails(recipeTitle :string){
  if (recipeTitle){
  console.log(recipeTitle);
  this.route.navigate([`recipe-details/${recipeTitle}`])
  }
}
loadRecipe(): void {
  this.apiService.getRecipesByName(`${this.item}`).subscribe(
      (data: any) => {
        console.log(data);

          this.recipes = data ;
      },
      (error) => {
          console.log(error);
      }
  );
}
  goToUserRecipes(){
    this.route.navigate(['/user-recipe'])
  }
}
