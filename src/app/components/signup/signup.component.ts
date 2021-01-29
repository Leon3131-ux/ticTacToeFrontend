import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpService} from '../../services/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private messageService: MessageService,
              private router: Router,
              private signUpService: SignUpService) { }

  signUpForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl()
  })

  signUp(){
    if (this.signUpForm.get('password').value === this.signUpForm.get('passwordConfirm').value){
      this.signUpService.signUp({username: this.signUpForm.get('username').value, password: this.signUpForm.get('password').value}).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'User created', life: 5000});
        this.router.navigate(['/login']);
      },
        () => {})
    }else {
      this.messageService.add({severity: 'error', summary: "Passwords don't match", life: 5000});
    }
  }

}
