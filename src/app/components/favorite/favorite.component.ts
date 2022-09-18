import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorite } from 'src/app/interfaces/favorit';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
//   export class UserRecipeComponent implements OnInit {
//     recipes:IRecipe[] =[];

//     constructor(public route: Router, private userService: UserService) { }

//     ngOnInit(): void {
//         this.userService.getRecipes().subscribe(recipes => {
//             this.recipes=recipes;
//         });
//     }
//     addNewRecipe() {
//         this.route.navigate(["/recipe-form"])
//     }
//     deleteRecipe(recipe:IRecipe){

//         this.userService.delete(recipe);

//     }
// }

favorites:IFavorite[] =[];

    constructor(public route: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getFavorite().subscribe( favorites=> {
            this.favorites= favorites;
        });
    }
    deleteFromFavorite(favorite :IFavorite){
      console.log('a');

      this.userService.deleteFromFavorite(favorite);
      console.log('b');

    }

}
