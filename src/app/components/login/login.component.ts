import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  constructor(public auth:AuthService, private userService: UserService , public route :Router) {}

  ngOnInit(): void {}
  login() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then(res => {
      this.isSubmitted = true;
      this.route.navigate(['recipe'])
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        text: ' Email or password is wrong ! please try again',
        confirmButtonColor: '#d54215',
      })
      console.log(err);
    })
  }

  goToSignUp(){
    this.route.navigate(['/register'])
  }
}
