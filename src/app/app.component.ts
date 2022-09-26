import { Component } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'recipesProject';
    loader : boolean =true;

    ngOnInit(): void {}
}
