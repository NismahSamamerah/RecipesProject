import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
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

    constructor(private userService: UserService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    saveRecipe() {
        const recipe: IRecipe = {
            id: this.generateID(),
            user_id: this.auth.userID as string,
            title: this.recipeForm.value.name,
            ingredients: this.getIngredientsArrayValues(),
            servings: this.recipeForm.value.servings,
            instructions: this.recipeForm.value.instructions
        }
        console.log(recipe);
        this.userService.saveRecipeInfo(recipe).then(res => {
            console.log(recipe);
        }).catch(err => {
            console.log(err);
        })
    }

    ngOnInit(): void {
    }
    submitRecipe(newRecipe: any) { }

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
        for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
        return s;
    }
}
