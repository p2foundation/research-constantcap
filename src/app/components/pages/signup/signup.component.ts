import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  userName = '';
  firstName = '';
  lastName = '';
  otherName = '';
  phoneNumber = '';
  email = '';
  password = '';
  photo = '';
  role = 'USER';
  gender = '';
  designation = '';
  dateOfBirth = '';
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      otherName: [null],
      mobile: [null, Validators.required],
      email: [null, Validators.required],
      photo: [null],
      role: [null],
      gender: [null],
      password: [null, Validators.required],
      designation: [null],
      dateOfBirth: [null]
    });
  }

  public registerNewUser(form: NgForm) {
    console.log('input form ===>'+form);
  }

}
