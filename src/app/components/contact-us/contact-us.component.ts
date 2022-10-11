import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: FormGroup = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),

  });


  constructor(public auth:AuthService, private userService: UserService) {}
  ngOnInit(): void {
  }

  saveInfo(item:any){
    this.userService.contactInfo(item).then(res => {
      console.log(item);
      this.contactUsForm.reset();
      Swal.fire({
        
        icon: 'success',
        title: 'Thank You',
        text : 'We will review your message as soon as possible',
        showConfirmButton: false,
        timer: 2000
      })
  }).catch(err => {
      console.log(err);
  })
  }

}

