import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { Utils } from 'src/app/common/utils';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  public data :IRecipe | ICocktail|undefined |any;
    public type: string | null = '';
    type_id: string = '';
    editMode :boolean = false;
    @ViewChild('instructions')  instructions: ElementRef| any;
    @ViewChild('name')  name: ElementRef |any;
    @ViewChild('ingredients')  ingredients: ElementRef |any;
    @ViewChild('servings')  servings: ElementRef |any;

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
        private router: ActivatedRoute,
        private cocktailService: CocktailService,
        private recipeService: RecipeService,
        private auth: AuthService,) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
      this.data = JSON.parse(JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data'))));
      if(this.data){
        this.editMode = true;

      }
        this.type = this.router.snapshot.paramMap.get('id');
        console.log('from form ');
        console.log( this.type);

    }

    ngAfterViewInit(): void {
    //   if (.hasOwnProperty('title')) {
    //     this.viewRecipeForm()
    // } else {
    //     this.viewCocktailForm
    // }
    this.viewCocktailForm();

  }
viewRecipeForm(){
  this.instructions.nativeElement.value = this.data.instructions;
  this.name.nativeElement.value = this.data.title;
  this.servings.nativeElement.value = this.data.servings;
  this.ingredients.nativeElement.value = this.data.ingredients;
}
viewCocktailForm(){
  this.instructions.nativeElement.value = this.data.instructions;
  this.name.nativeElement.value = this.data.name;
  this.servings.nativeElement.value = this.data.servings;
  this.ingredients.nativeElement.value = this.data.ingredients;
}

    isLoggedIn() {
        const loggedIn = Boolean(this.auth.userID);
        console.log(loggedIn);
        return loggedIn;
    }

    saveRecipes() {
      this.saveRecipe();
        if (this.type == 'Cocktail') {
          console.log(this.type);
          this.saveCocktail()

        } else if (this.type == 'Recipe') {
          console.log(this.type);
          this.saveRecipe();

        }
    }

    saveRecipe() {
      if(this.editMode){
        console.log('editMode');

        const data : IRecipe ={
          title: this.recipeForm.value.name,
          servings: this.recipeForm.value.servings,
          ingredients: this.getIngredientsArrayValues(),
          instructions: this.recipeForm.value.instructions,
          id: this.data.id,
          user_id: this.auth.userID as string
        }
        this.recipeService.update(data);
        this.editMode = false;
      }else{
        const recipe: IRecipe = {
            id: Utils.generateID(),
            user_id: this.auth.userID as string,
            title: this.recipeForm.value.name,
            ingredients: this.getIngredientsArrayValues(),
            servings: this.recipeForm.value.servings,
            instructions: this.recipeForm.value.instructions
        }
        this.recipeForm.reset();
        this.recipeService.saveRecipeInfo(recipe).then(res => {
            console.log(recipe);
        }).catch(err => {
            console.log(err);
        })

      }

    }

    saveCocktail() {
      if(this.editMode){
        const data : ICocktail ={
          name: this.recipeForm.value.name,
          ingredients: this.getIngredientsArrayValues(),
          instructions: this.recipeForm.value.instructions,
          id: this.data.id,
          user_id: this.auth.userID as string
        }
        this.recipeService.update(data);
        this.editMode = false;
      }else{
        const cocktail: ICocktail = {
            id: Utils.generateID(),
            user_id: this.auth.userID as string,
            name: this.recipeForm.value.name,
            ingredients: this.getIngredientsArrayValues(),
            instructions: this.recipeForm.value.instructions
        }
        this.recipeForm.reset();
        this.cocktailService.saveCocktailInfo(cocktail).then(res => {
            console.log(cocktail);
        }).catch(err => {
            console.log(err);
        })}

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
}
