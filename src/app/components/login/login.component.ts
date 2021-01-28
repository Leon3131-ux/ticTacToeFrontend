import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })


  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.loginForm.getRawValue()).subscribe(data => {
      this.authService.setToken(data.headers.get('Authorization'));
      this.router.navigate(['/home']);
    })
  }


}
