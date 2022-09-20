import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { IFavorite } from 'src/app/interfaces/favorite';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IRecipe } from 'src/app/interfaces/recipe';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
    recipes: any = [];
    public recipe: string = '';
    totalPages: number[] = [];
    currentPage: number = 1;

    constructor(
        public http: HttpClient,
        public route: Router,
        public apiService: ApiService,
        private auth : AuthService,
        private favorite : FavoriteService) {
            const sub = this.auth.user.subscribe(user => {
                this.auth.userID = user?.uid;
                sub.unsubscribe();
            })
    }
    ngOnInit(): void {
        this.apiService.getRecipesByName("fish").subscribe(
            (data: any) => {
                this.recipes = data;
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
                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }
//     loadData(page: number = 1): void {
//       const params = new HttpParams().set('page', page);
//         this.apiService.getRecipesByName(`${this.recipe}`).subscribe(
//             (data: any) => {
//                 this.recipes = data;
//             },
//             (error) => {
//                 console.log(error);
//             }
//         );
//     }

// next() {
//         if (this.currentPage >= this.totalPages.length) {
//             return;
//         }
//         this.currentPage++;
//         this.loadData(this.currentPage);
//     }

//     prev() {
//         if (this.currentPage <= 1) {
//             return;
//         }
//         this.currentPage--;
//         this.loadData(this.currentPage);
//     }

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

    addFavorite(recipe: IRecipe){
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
