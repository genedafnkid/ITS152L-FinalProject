import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = { username: '', password: '' };
  registerModel = { username: '', firstName: '', lastName: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.loginModel.username, this.loginModel.password).subscribe(
      response => {
        localStorage.setItem('auth-token', response.token); 
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }



  
}
