import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorite } from 'src/app/interfaces/favorite';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    recipes: any = [];
    recipe: string = '';


    constructor(private apiService: ApiService, public route: Router , public auth :AuthService , public favorite :FavoriteService) { }

    ngOnInit(): void {
    }
    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        });
    }
    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
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
    addFavorite(recipe: IRecipe) {
      const favoriteItem: IFavorite = {
          id: this.generateID(),
          type_id: recipe.title,
          user_id: this.auth.userID,
          type: recipe,
      }
      console.log(favoriteItem);
      this.favorite.addFavorite(favoriteItem).then(res => {

      }).catch(err => {
          console.log(err);
      })
  }
  generateID() {
    let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 9; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
    return s;
}
}
