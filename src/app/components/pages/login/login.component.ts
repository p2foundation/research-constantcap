import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // corrected styleUrl to styleUrls
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public message: string = '';

  public loginParams = {
    email: '',
    password: ''
  }

  public isLoading = false;
  returnUrl: string;

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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  onLogin(form: any) {
    console.log('LOGIN form inputs ==> ' + JSON.stringify(form));
    if (this.loginForm.invalid) {
      this.toastr.warning('No User Input');
      return;
    }

    this.showLoader();
    this.loginParams.email = form.email || '';
    this.loginParams.password = form.password;

    this.authService.loginUser(this.loginParams)
      .subscribe({
        next: (losfRes) => {
          console.log(`LOGIN access response ==> ${JSON.stringify(losfRes)}`);

          if (losfRes.accessToken) {
            this.authService.storeUserToken(losfRes.accessToken);
            this.authService.storeUserDataInLocalStorage(losfRes.user);

            this.message = 'Hurray! Successfully login';
            this.toastr.success(this.message);
            this.hideLoader();

            if (this.returnUrl) {
              console.log(`CHECK RETURN_URL ==>`, this.returnUrl);
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.router.navigate(['./']);
            }
          } else {
            this.hideLoader();
            this.message = 'Unauthorised accessed';
            this.toastr.warning(this.message);
            this.authService.removeToken();
          }

        },
        error: (losError) => {
          this.hideLoader();
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

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

}