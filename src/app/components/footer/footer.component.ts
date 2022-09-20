import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public route :Router) { }

  ngOnInit(): void {
  }
  goToContactUs(){
    this.route.navigate(['contact-us'])
  }

}
