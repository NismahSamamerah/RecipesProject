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

    constructor(public route: Router, private favoriteService: FavoriteService) { }

    ngOnInit(): void {
        this.favoriteService.getFavorite().subscribe( favorites=> {
            this.favorites= favorites;
        });
    }
    deleteFromFavorite(favorite :IFavorite){
      this.favoriteService.deleteFromFavorite(favorite);
    }

}
