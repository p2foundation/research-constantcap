import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SignupForm, ProfileData } from './interfaces/signup.interfaces'; // Add this import

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  signupParamsOld: any = {
    username: '',
    email: '',
    password: '',
    roleName: 'USER',
    profileData: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      bio: '',
      designation: ''
    }
  }

  signupParams: any = {
    username: '',
    email: '',
    password: '',
    roleName: 'USER',
    profileData: {} as ProfileData // This remains unchanged
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
  }
  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      roleName: [null],
      password: [null, Validators.required]
    });

  }

  public async registerNewUser(form: SignupForm) {
    if (this.signupForm.invalid) {
      this.toastr.warning('No User Input');
      return;
    }
  
    // Populate signupParams using the form data
    this.signupParams.username = form.firstName; // Assuming username is the first name
    this.signupParams.email = form.email;
    this.signupParams.roleName = form.roleName;
    this.signupParams.password = form.password;
    this.signupParams.profileData = {
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      bio: '', // Default value
      designation: '' // Default value
    } as ProfileData;
  
    await this.showLoader();
    this.authService.registerUser(this.signupParams) // Pass signupParams instead of signupForm
      .subscribe({
        next: async (_) => {
          this.toastr.success('User Registered Successfully');
          this.router.navigate(['/login']);
        },
        error: async (error) => {
          this.toastr.error(error);
        },
        complete: async () => {
          await this.hideLoader();
        }
      });
  }

  public async registerNewUserOld(form: any) {
    if (this.signupForm.invalid) {
      this.toastr.warning('No User Input');
      return;
    }
    this.signupParams.username = form.firstName;
    this.signupParams.email = form.email;
    this.signupParams.roleName = form.roleName;
    this.signupParams.password = form.password;
    this.signupParams.profileData.firstName = form.firstName;
    this.signupParams.profileData.lastName = form.lastName;
    this.signupParams.profileData.phoneNumber = form.phoneNumber;
    this.signupParams.profileData.bio = '';
    this.signupParams.profileData.designation = '';

    console.log('REGISTER input form ===>' + JSON.stringify(this.signupParams) );

    await this.showLoader();
    this.authService.registerUser(this.signupParams)
      .subscribe({
        next: async (rnuRes) => {
          console.log('USER REGISTER response ==> ' + rnuRes);
          if (rnuRes) {
            console.log(`USER REGISTER response ==> ${JSON.stringify(rnuRes)}`);
            this.toastr.success('User Registered Successfully');
            this.router.navigate(['/login']);
            await this.hideLoader();
          }
        },
        error: async (err) => {
          console.log('USER REGISTER error ==> ' + err);
          await this.hideLoader();
          this.toastr.error(err);
        }

      });
  }
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
  async showLoader() {
    this.isLoading = true;
  }
  async hideLoader() {
    this.isLoading = false;
  }

}
