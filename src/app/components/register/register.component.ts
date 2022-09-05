import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(13),
      Validators.max(80),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });
 
  constructor(public auth:AuthService, private userService: UserService) {
     
  }

  ngOnInit(): void {}
  register(newUser: any ) {
  
      this.auth.user.subscribe(user => {
        this.auth.userID = user?.uid;
        console.log(user?.uid);
      });

      this.auth.register(newUser.email, newUser.password).then(res => {
        this.userService.saveUserInfo(newUser).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })
  }
}
