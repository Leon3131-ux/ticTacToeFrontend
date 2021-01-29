import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup.component';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule
  ]
})
export class SignupModule { }
