import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public token: string = '';
  public message: string = '';

  public loginParams = {
    userName: '',
    email: '',
    mobile: '',
    password: ''
  }

  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onLogin(form: any) {
    console.log('LOGIN form inputs ==> ' + JSON.stringify(form));
    if (this.loginForm.invalid) {
      this.toastr.warning('No User Input');
      return;
    }

    await this.showLoader();
    this.loginParams.email = form.email || '';
    // this.loginParams.mobile = form.mobile;
    this.loginParams.password = form.password;

    this.authService.loginUser(this.loginParams)
      .subscribe({
        next: async (losfRes) => {
          console.log(`LOGIN access response ==> ${JSON.stringify(losfRes)}`);

          if (losfRes.accessToken) {
            this.authService.storeUserToken(losfRes.accessToken);
            this.authService.storeUserDataInLocalStorage(losfRes.user);
            
            this.message = 'Hurray! Successfully login';
            this.toastr.success(this.message);
            await this.hideLoader();
            this.router.navigate(['./']);
          } else {
            await this.hideLoader();
            this.message = 'Unauthorised accessed🛡️';
            this.toastr.warning(this.message);
            this.authService.removeToken();
          }

        },
        error: async (losError) => {
          await this.hideLoader();
          console.error('LOGIN error ===>', losError);
          this.toastr.error(losError);
        }

      });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  goToRegister() {
    this.router.navigateByUrl('/signup');
  }

  async showLoader() {
    this.isLoading = true;
  }

  async hideLoader() {
    this.isLoading = false;
  }

}
