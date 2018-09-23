import {RegisterComponent} from './app/register/register.component';
import {LoginComponent} from './app/login/login.component';
import {QuizComponent} from './app/quiz/quiz.component';
import {WelcomeComponent} from './app/welcome/welcome.component';
import {Routes} from '@angular/router';

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
