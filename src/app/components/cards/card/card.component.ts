import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
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

    @Input() recipe: IRecipe | undefined;
    recipes: any = [];
    
    constructor(private apiService: ApiService, 
        public route: Router, 
        public auth :AuthService,
        public favorite :FavoriteService) {}

    ngOnInit(): void {}

    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        });
    }

    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
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

    addFavorite(recipe: any) {
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
