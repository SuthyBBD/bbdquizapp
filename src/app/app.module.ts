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
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AppRoutesModule} from '../app-routes.module';
import {HeaderComponent} from './navigation/header/header.component';
import {SideNavComponent} from './navigation/side-nav/side-nav.component';
import {QuestionTabsComponent} from './navigation/question-tabs/question-tabs.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {LoggedInAuthGuard} from '../services/loggedInAuthGuard';
import {UserService} from '../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {QuizController} from './api/quiz-controller';
import {QuizService} from '../services/quiz.service';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    QuizComponent,
    RegisterComponent,
    NavBarComponent,
    HeaderComponent,
    SideNavComponent,
    QuestionTabsComponent,
    QuizResultComponent
  ],
  entryComponents: [
    QuestionTabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutesModule,
    FlexLayoutModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCB7LzWW3y8gt_ZjpitDOlxB9zwd3dBaGI',
      authDomain: 'bbdquizapp.firebaseapp.com',
      databaseURL: 'https://bbdquizapp.firebaseio.com',
      projectId: 'bbdquizapp',
      storageBucket: 'bbdquizapp.appspot.com',
      messagingSenderId: '392710615943'
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [LoggedInAuthGuard, UserService, QuizService, QuizController],
  bootstrap: [AppComponent]
})
export class AppModule {
}
