import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorite } from 'src/app/interfaces/favorite';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

    favorites: IFavorite[] = [];
    favValue: string = '';
    favoritesSearch: IFavorite[] = [];

    constructor(public route: Router, private favoriteService: FavoriteService, private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
     }

    ngOnInit(): void {
        this.favoritesSearch;
        const sub = this.favoriteService.getFavoriteRecipe(this.auth.userID as string).subscribe(favorites => {
            this.favorites = favorites;
            this.favoritesSearch = favorites;
            sub.unsubscribe();
        });
    }
    search() {
        this.favoritesSearch = this.favorites.filter(favorite => {
            return favorite.type_id.toLowerCase().includes(this.favValue.toLowerCase());
        })
    }

    deleteFromFavorite(favorite: IFavorite) {
        this.favoriteService.deleteFromFavorite(favorite);
    }

    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    }
}
