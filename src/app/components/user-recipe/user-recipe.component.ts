import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.css']
})
export class UserRecipeComponent implements OnInit {

  constructor(public route : Router) { }

  ngOnInit(): void {
  }
  addNewRecipe(){
    this.route.navigate(["/recipe-form"])
  }

}
