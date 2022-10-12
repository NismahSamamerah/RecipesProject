import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loader: boolean = true;
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

    constructor(public auth: AuthService, 
        private userService: UserService, 
        public route: Router) {
    }

    ngOnInit() {
    }
    register() {
      Swal.fire({
        icon: 'info',
        title: 'Proccing ..',
        showConfirmButton: false,
        timer: 7000
      })
        const newUser: IUser = {
            id: '',
            first_name: this.registerForm.value.firstName,
            last_name: this.registerForm.value.lastName,
            DOB: this.registerForm.value.age,
            gender: this.registerForm.value.gender,
            email: this.registerForm.value.email,
        }

        this.auth.register(newUser.email, this.registerForm.value.password).then(res => {
            this.userService.saveUserInfo(newUser).then(res => {
                console.log(res);
                Swal.fire({
                  icon: 'success',
                  title: 'Registerd Succussfly',
                  showConfirmButton: false,
                  timer: 15000
                })
                this.route.navigate(['/recipe'])
            }).catch(err => {
                console.log(err);

            })
        }).catch(err => {
            console.log(err);
        })
    }

    goToLogin(){
      this.route.navigate(['/login'])
    }
}
