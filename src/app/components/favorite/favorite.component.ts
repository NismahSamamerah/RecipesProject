import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    filterForm: FormGroup = new FormGroup({
    filter:new FormControl ('', Validators.required)
    });
    filterValue: string = '';
  loader: boolean = true;



    constructor(public route: Router,
        private favoriteService: FavoriteService,
        public fb: FormBuilder,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })

    }

    ngOnInit(): void {
      setTimeout(()=>{
        this.loader = false;
      },6000)
    }

    filter(filterValue: string) {
        console.log(filterValue);

        switch (filterValue) {
            case 'recipe':
                const rsub = this.favoriteService.getFavoriteRecipe(this.auth.userID as string).subscribe(favorites => {
                    this.favorites = favorites;
                    rsub.unsubscribe();
                });
                break;
            case 'cocktail':
                const csub = this.favoriteService.getFavoriteCocktail(this.auth.userID as string).subscribe(favorites => {
                    this.favorites = favorites;
                    csub.unsubscribe();
                });
                break;
            default:
                const sub = this.favoriteService.getFavorites(this.auth.userID as string).subscribe(favorites => {
                    this.favorites = favorites;

                    sub.unsubscribe();
                });
                break;
        }
        setTimeout(()=>{
          this.loader = false;
        },3000)
    }



    search() {
        this.favoritesSearch = this.favorites.filter(favorite => {
            return favorite.type_id.toLowerCase().includes(this.favValue.toLowerCase());
        })
        this.favorites = [];
    }

    deleteFromFavorite(favorite: IFavorite) {
        this.favoriteService.deleteFromFavorite(favorite);
        location.reload();
    }

    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    }
}
