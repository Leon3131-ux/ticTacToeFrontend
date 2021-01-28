import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token');

  }

  setToken(token: string){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string{
    return JSON.parse(sessionStorage.getItem('token'));
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  getUsername(){
    return JSON.parse(atob(sessionStorage.getItem('token').split('.')[1])).username;
  }


}
