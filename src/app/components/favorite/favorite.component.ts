import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorite } from 'src/app/interfaces/favorite';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

favorites:IFavorite[] =[];
favValue :string ='';
favoritesSearch :IFavorite[]=[];

    constructor(public route: Router, private favoriteService: FavoriteService) { }

    ngOnInit(): void {
      this.favoritesSearch;
        this.favoriteService.getFavorite().subscribe( favorites=> {
            this.favorites= favorites;
        });
    }
    search(){
      //TODO:
      this.favoritesSearch=[];
      for(let favorite of this.favorites){
        if(favorite.type_id.includes(this.favValue)){
          this.favoritesSearch.push(favorite);
        }
      }
      this.favorites = [];
  }

    deleteFromFavorite(favorite :IFavorite){
      this.favoriteService.deleteFromFavorite(favorite);
    }

}
