import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { Utils } from 'src/app/common/utils';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  public data: IRecipe | ICocktail | undefined | any;
  public type: string | null = '';
  type_id: string = '';
  editMode: boolean = false;
  FormValue = false;

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required , Validators.maxLength(10)]),
    ingredients: new FormArray([]),
    servings: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required ,Validators.maxLength(100)]),
    // image: new FormControl(null, [Validators.required]),
  });

  ingredientItem: FormGroup = new FormGroup({
    item: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private cocktailService: CocktailService,
    private recipeService: RecipeService,
    private auth: AuthService,
    private route :Router
  ) {
    const sub = this.auth.user.subscribe((user) => {
      this.auth.userID = user?.uid;
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.type = this.router.snapshot.paramMap.get('id');
    console.log(this.recipeForm);

    this.data = JSON.parse(
      JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data')))
    );
    if (this.data) {
      this.editMode = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.data.hasOwnProperty('title')) {
      this.type = 'Recipe';
      this.viewRecipeForm();
    } else {
      this.type = 'Cocktail';
      this.viewCocktailForm();
    }
  }
  viewRecipeForm() {
    this.recipeForm.controls['name'].setValue(this.data.title);
    this.recipeForm.controls['instructions'].setValue(this.data.instructions);
    this.recipeForm.controls['servings'].setValue(this.data.servings);
    this.recipeForm.controls['ingredients'].setValue(this.data.ingredients);
  }
  viewCocktailForm() {
    this.recipeForm.controls['name'].setValue(this.data.name);
    this.recipeForm.controls['instructions'].setValue(this.data.instructions);
    this.recipeForm.controls['ingredients'].setValue(this.data.ingredients);
  }

  isLoggedIn() {
    const loggedIn = Boolean(this.auth.userID);
    console.log(loggedIn);
    return loggedIn;
  }

  saveRecipes() {
    if (this.editMode && this.type == 'Cocktail') {
      this.editCocktail();
    } else if (this.editMode && this.type == 'Recipe') {
      this.editRecipe();
    } else if (this.type == 'Cocktail' ) {
      if(this.recipeForm.valid == true){
        this.saveCocktail();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' please fill the form',
        })
      }
    } else if (this.type == 'Recipe' ) {
      if(this.recipeForm.valid == true){
        this.saveRecipe();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' please fill the form',
        })
      }

    }
  }
  editRecipe(){
    const data: any = {
      title: this.recipeForm.value.name,
      servings: this.recipeForm.value.servings,
      ingredients: this.getIngredientsArrayValues(),
      instructions: this.recipeForm.value.instructions,
      id: this.data.id,
      user_id: this.auth.userID as string,
    };
    this.recipeService.update(data);
    Swal.fire('Your recipe was succesfully edited')
    this.editMode = false;
  }
  editCocktail() {
    const data: ICocktail = {
      name: this.recipeForm.value.name,
      ingredients: this.getIngredientsArrayValues(),
      instructions: this.recipeForm.value.instructions,
      id: this.data.id,
      user_id: this.auth.userID as string,
    };
    this.cocktailService.update(data);
    Swal.fire('Your recipe was succesfully edited')
    this.editMode = false;
  }
  saveRecipe() {
    const recipe: IRecipe = {
      id: Utils.generateID(),
      user_id: this.auth.userID as string,
      title: this.recipeForm.value.name,
      ingredients: this.getIngredientsArrayValues(),
      servings: this.recipeForm.value.servings,
      instructions: this.recipeForm.value.instructions,
    };
    this.recipeForm.reset();
    this.recipeService
      .saveRecipeInfo(recipe)
      .then((res) => {
        Swal.fire('You added new recipe succesfully')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! please try again',
        })
      });
  }

  saveCocktail() {
    const cocktail: ICocktail = {
      id: Utils.generateID(),
      user_id: this.auth.userID as string,
      name: this.recipeForm.value.name,
      ingredients: this.getIngredientsArrayValues(),
      instructions: this.recipeForm.value.instructions,
    };
    this.recipeForm.reset();
    this.cocktailService
      .saveCocktailInfo(cocktail)
      .then((res) => {
        Swal.fire('You added new recipe succesfully')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! please try again',
        })
      });
  }

  addNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        item: new FormControl(''),
      })
    );
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

  backToAllRecipes(){
    if(this.type == 'Recipe'){
    this.route.navigate(['/user-recipe', { data: 'Recipe' }])
    }else{
      this.route.navigate(['/user-recipe', { data: 'Cocktail' }])
    }
  }
}
