import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  errorMessage: string = '';
  successMessage: string = '';
  registerModel = { username: '', firstName: '', lastName: '', password: '' };
  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerModel.username && this.registerModel.firstName && this.registerModel.lastName && this.registerModel.password) {
      this.authService.register(
        this.registerModel.username,
        this.registerModel.firstName,
        this.registerModel.lastName,
        this.registerModel.password
      ).subscribe(
        response => {
          if (response && response.message === 'User Registered') {
            this.successMessage = 'Registration successful!';
            this.toastr.success('Login successful! You can now login', 'Success');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);

          } else {
            this.errorMessage = 'Registration failed';
            this.toastr.error('Registration failed. Please try again later.', 'Error');
          }
        },
        error => {
          this.errorMessage = 'Registration failed';
          if (error.status === 400) {
            this.errorMessage = 'Bad request. Please check the entered data.';
          }
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }
}
