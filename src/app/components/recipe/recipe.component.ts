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

  recipes : any = [];
  public recipe :string = '';


  constructor(public http: HttpClient, public route : Router , public apiService :ApiService , public auth : AuthService ,public user : UserService) {
    const sub = this.auth.user.subscribe(user => {
      this.auth.userID = user?.uid;
      sub.unsubscribe();
  })
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

    // searchRecipe(value: string) {
    //     this.apiService.getRecipesByName(value).subscribe((data) => {
    //         console.log(data, "searchable");
    //     });
    // }
    loadRecipe(){
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
    getRecipeDetails(recipeTitle: string) {
        if (recipeTitle) {
            console.log(recipeTitle);

            this.route.navigate([`recipe-details/${recipeTitle}`])
        }
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
