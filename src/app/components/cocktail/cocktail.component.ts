import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  constructor(public router : Router) { }

  ngOnInit(): void {
  }
  goToMyCocktails(){
    this.router.navigate(['/user-cocktail']);
  }

}
