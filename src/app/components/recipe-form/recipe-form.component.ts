import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivatedRoute, Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
    public type: string | null = '';
    recipeForm: FormGroup = new FormGroup({
        name: new FormControl('', [
            Validators.required,
        ]),
        ingredients: new FormArray([]),
        servings: new FormControl('', [Validators.required
        ]),
        instructions: new FormControl('', [Validators.required
        ]),
    });

    ingredientItem: FormGroup = new FormGroup({
        item: new FormControl(''),
    });

    constructor(private userService: UserService, private router: ActivatedRoute,
        private auth: AuthService , private route :Router) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
        // this.isLoggedIn()
        // this.auth.isLogin()
    }
    ngOnInit(): void {
        this.type = this.router.snapshot.paramMap.get('id');
    }
    isLoggedIn() {
        const loggedIn = Boolean(this.auth.userID);
        console.log(loggedIn);
        return loggedIn;
    }

    saveRecipe() {
        const recipe: IRecipe | ICocktail = {
            id: this.generateID(),
            user_id: this.auth.userID as string,
            title: this.recipeForm.value.name,
            ingredients: this.getIngredientsArrayValues(),
            servings: this.recipeForm.value.servings,
            instructions: this.recipeForm.value.instructions
        }
        if (this.type == 'Cocktail') {
            this.userService.saveCocktailInfo(recipe).then(res => {
                console.log(recipe);
            }).catch(err => {
                console.log(err);
            })
        } else if (this.type == 'Recipe') {
            this.userService.saveRecipeInfo(recipe).then(res => {
                console.log(recipe);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    addNewIngredient() {
        (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
            item: new FormControl(''),
        }));
    }

    getIngredientsArray() {
        const array = this.recipeForm.get('ingredients') as FormArray;
        return array.controls as FormGroup[];
    }

    getIngredientsArrayValues() {
        const arr: string[] = [];
        for (let item of this.getIngredientsArray()) {
            arr.push(item.value.item);
        }
        return arr;
    }
    generateID() {
        let m = 9;
        let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < m; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
        return s;
    }


}
