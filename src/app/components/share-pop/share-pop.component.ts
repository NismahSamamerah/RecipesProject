import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { IShared } from 'src/app/interfaces/shared';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-share-pop',
    templateUrl: './share-pop.component.html',
    styleUrls: ['./share-pop.component.css']
})
export class SharePopComponent implements OnInit {
    users: IUser[] = [];
    usersShared: string[] = [];
    data: any;

    constructor(private auth: AuthService,
        public route: Router,
        private router: ActivatedRoute,
        private userService: UserService,
        private sharedService: SharedService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
        this.data = JSON.parse(JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data'))));
        this.getUsers();
        
    }
    sharedArr(e: any) {
        console.log(e.target.value);
        this.usersShared.push(e.target.value)
    }
    share() {
        let type = ''
        if (this.data.hasOwnProperty('title')) {
            type = 'recipe';
            const shared: IShared = {
                id: Utils.generateID(),
                user_id: this.auth.userID as string,
                type: type,
                recipe_id: this.data.id,
                shared_users: this.usersShared
            }
            this.sharedService.saveSharedInfo(shared);
            this.route.navigate(['/user-recipe', { data: 'Recipe' }])
        } else {
            type = 'cocktail';
            const shared: IShared = {
                id: Utils.generateID(),
                user_id: this.auth.userID as string,
                type: type,
                recipe_id: this.data.id,
                shared_users: this.usersShared
            }
            this.sharedService.saveSharedInfo(shared);
            this.route.navigate(['/user-recipe', { data: 'Cocktail' }])
        }


    }
    getUsers() {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        })
    }

}
