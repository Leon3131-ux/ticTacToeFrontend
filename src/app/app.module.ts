import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {TranslateModule} from '@ngx-translate/core';
import {LoginComponent} from './components/login/login.component';
import {LoginModule} from './components/login/login.module';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AuthErrorHandler} from './errorHandler/auth-error-handler';
import {DefaultErrorHandler} from './errorHandler/default-error-handler';
import {InternalServerErrorHandler} from './errorHandler/internal-server-error-handler';
import {LoginErrorHandler} from './errorHandler/login-error-handler';
import {NotFoundErrorHandler} from './errorHandler/not-found-error-handler';
import {ValidationErrorHandler} from './errorHandler/validation-error-handler';
import {MessageService} from 'primeng/api';
import { HomeComponent } from './components/home/home.component';
import {HomeModule} from './components/home/home.module';
import {httpInterceptProviders} from './httpInterceptors/HttpInteceptProviders';
import { GameComponent } from './components/game/game.component';
import {GameModule} from './components/game/game.module';
import { LobbyComponent } from './components/lobby/lobby.component';
import {LobbyModule} from './components/lobby/lobby.module';
import {ActiveGameErrorHandler} from './errorHandler/active-game-error- handler';
import {DoNothingErrorHandler} from './errorHandler/do-nothing-error-handler';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggedInGuard} from './guards/logged-in.guard';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'lobby', component: LobbyComponent, canActivate: [LoggedInGuard]},
  {path: 'game', component: GameComponent, canActivate: [LoggedInGuard]},
  {path: '**', redirectTo: '/login'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    TranslateModule.forRoot(),
    LoginModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    LobbyModule,
    HomeModule,
    GameModule,
    ToastModule
  ],
  providers: [
    AuthErrorHandler,
    DefaultErrorHandler,
    InternalServerErrorHandler,
    LoginErrorHandler,
    NotFoundErrorHandler,
    ValidationErrorHandler,
    ActiveGameErrorHandler,
    DoNothingErrorHandler,
    MessageService,
    httpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
