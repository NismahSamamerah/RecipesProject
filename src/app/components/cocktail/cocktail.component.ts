import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IFavorite } from 'src/app/interfaces/favorite';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-cocktail',
    templateUrl: './cocktail.component.html',
    styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
    cocktails: any = [];
    cocktail: string = '';

    constructor(public router: Router,
        public apiService: ApiService,
        public auth: AuthService,
        public user: UserService,
        private favorite: FavoriteService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
        this.apiService.getCocktailsByName("orange").subscribe(
            (data: any) => {
                this.cocktails = data;
            }, (error) => {
                console.log(error);
            }
        );
    }
    loadCocktail(): void {
        this.apiService.getCocktailsByName(`${this.cocktail}`).subscribe(
            (data: any) => {
                this.cocktails = data;
            },
            (error) => {
                console.log(error);
            }
        ).unsubscribe();
    }
    goToUserRecipes() {
        this.router.navigate(['user-cocktail']);
    }
    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        }).unsubscribe();
    }
    getRecipeDetails(recipe: any) {
        this.router.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
    }
    addFavorite(cocktail: ICocktail) {
        const favoriteItem: IFavorite = {
            id: this.generateID(),
            type_id: cocktail.name,
            user_id: this.auth.userID,
            type: cocktail,
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
