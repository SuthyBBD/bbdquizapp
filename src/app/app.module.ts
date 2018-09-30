import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {QuizComponent} from './quiz/quiz.component';
import {RegisterComponent} from './auth/register/register.component';
import {UserComponent} from './user/user.component';
import {UserListComponent} from './user-list/user-list.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AppRoutesModule} from '../app-routes.module';
import {HeaderComponent} from './navigation/header/header.component';
import {SideNavComponent} from './navigation/side-nav/side-nav.component';
import {NavTabsComponent} from './navigation/nav-tabs/nav-tabs.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TimerDirective} from './timer.directive';
import {FormsModule} from '@angular/forms';
import {LoggedInAuthGuard} from '../services/loggedInAuthGuard';
import {UserService} from '../services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    QuizComponent,
    RegisterComponent,
    UserComponent,
    UserListComponent,
    NavBarComponent,
    HeaderComponent,
    SideNavComponent,
    NavTabsComponent,
    TimerDirective
  ],
  entryComponents: [
    NavTabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutesModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCB7LzWW3y8gt_ZjpitDOlxB9zwd3dBaGI',
      authDomain: 'bbdquizapp.firebaseapp.com',
      databaseURL: 'https://bbdquizapp.firebaseio.com',
      projectId: 'bbdquizapp',
      storageBucket: 'bbdquizapp.appspot.com',
      messagingSenderId: '392710615943'
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [LoggedInAuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
