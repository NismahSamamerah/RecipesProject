import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(public route :Router) { }

  ngOnInit(): void {
  }
  goToUserRecipes(){
    this.route.navigate(['/user-recipe'])

  }

}
