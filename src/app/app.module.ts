import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {AppRoutesModule} from '../app-routes.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { NavTabsComponent } from './navigation/nav-tabs/nav-tabs.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CounterDirective} from './timer.directive';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    QuizComponent,
    QuestionComponent,
    RegisterComponent,
    UserComponent,
    UserListComponent,
    NavBarComponent,
    HeaderComponent,
    SideNavComponent,
    NavTabsComponent,
    CounterDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutesModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
