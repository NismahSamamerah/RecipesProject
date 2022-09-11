import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
    ingredients:  new FormArray([]),
    servings: new FormControl('', [Validators.required
    ]),
    instructions:new FormControl('', [Validators.required
    ]),
  });

  ingredientItem: FormGroup = new FormGroup({
    item: new FormControl(''),
});

  constructor() { }

  ngOnInit(): void {
  }
  submitRecipe(newRecipe :any){}

  addNewIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      item: new FormControl(''),
  }));
  console.log(this.ingredientItem);
  }

  getIngredientsArray() {
    const array =  this.recipeForm.get('ingredients') as FormArray;
    return array.controls as FormGroup[];
}
}
