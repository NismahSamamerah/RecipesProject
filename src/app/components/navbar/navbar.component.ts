import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public isLoggedIn: boolean | null = null;

    constructor(public authService: AuthService, public route: Router) { }
    // LoginRoute = this.route.navigate(['login']);
    // RegisterRoute = this.route.navigate(['register']);

    ngOnInit(): void {
        this.authService.user.subscribe(user => {
            // this.isLoggedIn = user? true: false;
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });
    }
    logout() {
        this.authService.logout();
        this.route.navigate(['/login'])
        console.log('logout');
    }
}
