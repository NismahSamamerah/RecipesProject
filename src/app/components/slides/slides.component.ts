import { animate, animation, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  animations:[
    trigger('fade',[
      transition('void =>*',[
        style({ opacity :0}),
        animate(3000,style({opacity :1 }))
      ])
    ])
  ]
})
export class SlidesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      grabCursor: true,
      breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 10,
          }
      }
  });
  }
  // images = [944, 1011, 984];

}
