import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  recipeTitle?:string;
recipe :any=[]

    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', [Validators.required,
        ]),
    });

  constructor(public route : Router , public apiService :ApiService , public recipeComponent : RecipeComponent

  , private commentService: CommentService,
        private auth: AuthService , public activeRouter: ActivatedRoute,) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
      // let recipe = this.recipeComponent.getRecipes();
      // console.log(recipe);

      // this.recipeComponent.getRecipeDetails(this.recipe.title);
      this.recipeTitle = String(this.activeRouter.snapshot.paramMap.get('id'));
      if (this.recipeTitle) {
          const queryParams = new HttpParams().set('recipe_title', this.recipeTitle)
          this.apiService.get('/recipe-details', { params: queryParams }).subscribe(
              (data) => {
                  this.recipe = data ;
                  console.log(this.recipe);
              },

              (error) => {
                  console.log(error);
              }
          )
      }
  }


    setRate(rate: number) {
        console.log(rate);
        //TODO:
    }
    saveComment() {
        const comment: IComment = {
            type_id: '',//TODO:
            user_id: this.auth.userID as string,
            comment: this.commentForm.value.comment,
            type: 'recipe'
        }
        this.commentService.saveCommentInfo(comment).then(res => {
            console.log(comment);
        }).catch(err => {
            console.log(err);
        })
    }

}
