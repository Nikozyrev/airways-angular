import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogIn, IUserSignUp } from '../models/user.model';
import { IAuthResponse } from '../models/user-server-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoints = {
    users: '/users/',
    login: '/login/',
  };

  constructor(private http: HttpClient) {}

  public signUp(userData: IUserSignUp) {
    return this.http.post<IAuthResponse>(this.endpoints.users, userData);
  }

  public login(userData: IUserLogIn) {
    return this.http.post<IAuthResponse>(this.endpoints.login, userData);
  }

  public saveUser(res: IAuthResponse) {
    const { accessToken, user } = res;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getAccessToken() {
    return localStorage.getItem('token') || '';
  }
}
