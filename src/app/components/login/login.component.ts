import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isSubmitted = false;
  constructor(public auth:AuthService, private userService: UserService) {}

  ngOnInit(): void {}
  login(newUser: any) {
     this.auth.login(newUser.email, newUser.password).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
}

