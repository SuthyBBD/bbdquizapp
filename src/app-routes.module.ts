import {RegisterComponent} from './app/auth/register/register.component';
import {LoginComponent} from './app/auth/login/login.component';
import {QuizComponent} from './app/quiz/quiz.component';
import {WelcomeComponent} from './app/welcome/welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoggedInAuthGuard} from './services/loggedInAuthGuard';
import {QuizResultComponent} from './app/quiz-result/quiz-result.component';

export const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'quiz-result',
    component: QuizResultComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutesModule {
}

