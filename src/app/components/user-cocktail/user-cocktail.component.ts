import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cocktail',
  templateUrl: './user-cocktail.component.html',
  styleUrls: ['./user-cocktail.component.css']
})
export class UserCocktailComponent implements OnInit {
  // cocktailsForm :FormGroup = new FormGroup({
  //   name : new FormControl('',[
  //     Validators.required ,Validators.minLength(3),Validators.maxLength(30)
  //   ]
  //   ),
  //   ingredients : new FormControl('',[
  //     Validators.required ,Validators.minLength(3),Validators.maxLength(30)
  //   ]),
  //   instructions : new FormControl('',[
  //     Validators.required ,Validators.minLength(3)
  //   ]),

  // })
  constructor(public route : Router) { }

  ngOnInit(): void {
  }
  addNewCocktail(){
    this.route.navigate(["/recipe-form"])
  }

}
