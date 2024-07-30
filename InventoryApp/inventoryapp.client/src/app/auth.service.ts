import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "";
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`https://localhost:7149/api/Login/login`, { username, password })
      .pipe(
        map(response => {
          this.setToken(response.token);
          return response;
        })
      );
  }

  register(username: string, firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.post<any>(`https://localhost:7149/api/Login/register`, { username, firstName, lastName, password });
  }
}

