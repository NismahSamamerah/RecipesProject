import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { IShared } from 'src/app/interfaces/shared';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../../login/login.component';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
    @Input() recipe: IRecipe | undefined;
    @Input() cocktail: ICocktail | undefined;
    users: IUser[] = [];
    usersShared: string[] = [];
    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private route: Router,
        private auth: AuthService,
        private userService: UserService,
        private sharedService: SharedService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
    }

    deleteRecipe(recipe: any) {
        this.recipeService.delete(recipe);
    }
    getUserRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        console.log('data from card');
        console.log(recipe);
    }
    deleteCocktail(cocktail: any) {
        this.cocktailService.deleteCocktail(cocktail);
    }
    getUsers() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        })
    }
    sharedArr(e: any) {
        console.log(e.target.value);
        this.usersShared.push(e.target.value)
    }
    share(recipe: any) {
        let type =''
        if (recipe.hasOwnProperty('title')) {
            type= 'recipe'
        } else {
            type= 'cocktail'
        }
        const shared: IShared = {
            id: Utils.generateID(),
            user_id: this.auth.userID as string,
            type: type,
            recipe_id: recipe.id,
            shared_users: this.usersShared
        }
        this.sharedService.saveSharedInfo(shared);
        
    }
}
