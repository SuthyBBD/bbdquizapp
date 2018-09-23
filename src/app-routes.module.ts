import {RegisterComponent} from './app/auth/register/register.component';
import {LoginComponent} from './app/auth/login/login.component';
import {QuizComponent} from './app/quiz/quiz.component';
import {WelcomeComponent} from './app/welcome/welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

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
    component: QuizComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    component: WelcomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutesModule {}

