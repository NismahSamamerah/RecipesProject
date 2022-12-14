import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IFavorite } from 'src/app/interfaces/favorite';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
    selector: 'app-cocktail',
    templateUrl: './cocktail.component.html',
    styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
    cocktails: any = [];
    cocktail: string = '';
    cocktailImg: any;
    cocktailImgs: any[] = [];
    loader :boolean =true;

    constructor(
        public router: Router,
        public apiService: ApiService,
        public auth: AuthService,
        private favorite: FavoriteService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
        setTimeout(() => {
            const fsub = this.apiService.getCocktailsByName("orange").subscribe(
                (data: any) => {
                    this.cocktails = data;
                    fsub.unsubscribe()
            });
            const cSub = this.apiService.getImage('orange cocktail').subscribe(res => {
                this.cocktailImg = res;
                cSub.unsubscribe();
                for (let i = 0; i < 10; i++) {
                    this.cocktailImgs.push(this.cocktailImg.results[Math.floor(Math.random() * 10)].urls.regular)
                }
            });
            this.loader = false;
        }, 4000)
    }

    loadCocktail(): void {
            const fsub = this.apiService.getCocktailsByName(`${this.cocktail} `).subscribe(
                (data: any) => {
                    this.cocktails = data;
                    console.log(this.cocktails);

                    fsub.unsubscribe()
                })
            const cSub = this.apiService.getImage(`${this.cocktail} cocktail`).subscribe(res => {
                this.cocktailImg = res;
                cSub.unsubscribe();
                this.cocktailImgs = []
                for (let i = 0; i < 10; i++) {
                    this.cocktailImgs.push(this.cocktailImg.results[Math.floor(Math.random() * 10)].urls.regular)
                }
            })
    }

    goToUserRecipes() {
        this.router.navigate(['/user-recipe', { data: 'Cocktail' }]);
    }

    getRecipeDetails(recipe: any) {
        this.router.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    }

    addFavorite(cocktail: ICocktail) {
        const favoriteItem: IFavorite = {
            id: Utils.generateID(),
            type_id: cocktail.name,
            user_id: this.auth.userID,
            typeS: 'cocktail',
            type: cocktail,
        }
        this.favorite.addFavorite(favoriteItem).then(res => {
        }).catch(err => {
            console.log(err);
        })
    }
}
