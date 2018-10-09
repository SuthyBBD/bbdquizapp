import {AfterContentInit, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Question} from '../model/question';
import {Quiz} from '../model/quiz';
import {QuestionTabsComponent} from '../navigation/question-tabs/question-tabs.component';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {interval, Subscription, timer} from 'rxjs';
import {map, take} from 'rxjs/internal/operators';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {User} from '../model/user';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, AfterContentInit {
  @ViewChild('quizComponent', {read: ViewContainerRef}) quizComponent;

  questions: Question[];
  quiz: Quiz;
  questionCounter = 1;
  q1: Question;
  q2: Question;
  q3: Question;
  q4: Question;
  q5: Question;

  submitted: boolean;
  quizFinished: boolean;
  quizStarted: boolean;

  user: User;
  userScore = 0;
  action: string;
  message: string;
  userSelection: string;
  dueTime: Subscription;
  completedQuizList;


  counter$ = []; // $observable
  count = [0, 10, 10, 10, 10, 10]; // skip first to align count with questions

  showQuestion: number;

  navTabsFactory: ComponentFactory<any>;
  navTabs: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver,
              public snackBar: MatSnackBar,
              private router: Router,
              private quizService: QuizService,
              private userService: UserService,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  ngAfterContentInit() {
    this.navTabsFactory = this.resolver.resolveComponentFactory(QuestionTabsComponent); // dynamically inject question tabs component
    this.navTabs = this.quizComponent.createComponent(this.navTabsFactory);
  }

  setCurrentUser() {
    this.userService.retrieveUserList().subscribe(list => {
      list.forEach(listItem => {
        console.log(listItem.email + ' ?= ' + this.afAuth.auth.currentUser.email);
        if (listItem.email === this.afAuth.auth.currentUser.email) {
          this.user = listItem;
          this.getQuiz();
        }
      });
    });
  }

  startQuiz() {
    this.quizStarted = true;
    this.showQuestion = this.navTabs.instance.showQuestion = 1;
    this.startTimer(1);
  }

  startTimer(question) {
    this.counter$[question] = timer(0, 1000).pipe(
      take(this.count[question]),
      map(() => --this.count[question])
    );
    this.dueTime = interval(10000)
      .subscribe((val) => {
        this.submitted = true;
        this.openSnackBar('Time up!', 'darn');
      });
  }

  submit(questionNum) {
    this.submitted = true;
    switch (questionNum) {
      case 1:
        console.log(this.userSelection + ' ?= ' + this.quiz.questions[questionNum - 1].answer);
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
        break;
      case 2:
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
        break;
      case 3:
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
        break;
      case 4:
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
        break;
      case 5:
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
        break;
    }
    this.openSnackBar(this.message, this.action);
  }

  openSnackBar(message: string, action: string) {
    this.dueTime.unsubscribe();
    this.snackBar.open(message, action).onAction().subscribe(() => {
      this.nextQuestion();
      this.submitted = false;
    });
  }

  setSuccessMessage() {
    this.message = 'Correct!';
    this.action = 'Yay';
  }

  setFailMessage() {
    this.message = 'Incorrect';
    this.action = 'Aww';
  }

  nextQuestion() {
    this.questionCounter++;
    switch (this.questionCounter) {
      case 2:
        this.showQuestion = this.navTabs.instance.showQuestion = 2;
        this.startTimer(2);
        break;
      case 3:
        this.showQuestion = this.navTabs.instance.showQuestion = 3;
        this.startTimer(3);
        break;
      case 4:
        this.showQuestion = this.navTabs.instance.showQuestion = 4;
        this.startTimer(4);
        break;
      case 5:
        this.showQuestion = this.navTabs.instance.showQuestion = 5;
        this.startTimer(5);
        break;
      case 6:
        this.showQuestion = this.navTabs.instance.showQuestion = 0;
        console.log('FINAL CASE');
        this.quizFinished = true;
        this.afterQuizComplete();
    }
  }

  afterQuizComplete() {
    console.log('user completed quizes: ' + this.user.completedQuizes);
    this.userScore = this.userScore + Number(this.user.score);
    this.completedQuizList = [this.quiz.quizId];
    if (this.user.completedQuizes) {
      this.completedQuizList.concat(this.user.completedQuizes);
    }
    this.userService.updateUser(this.userScore, this.completedQuizList);
  }

  // prevQuestion() {
  //   this.questionCounter--;
  //   console.log(this.questionCounter);
  //   switch (this.questionCounter) {
  //     case 1:
  //       this.showQuestion = this.navTabs.instance.showQuestion = 1; // instances of QuestionTabsComponent must be referenced explicitly
  //       break;
  //     case 2:
  //       this.showQuestion = this.navTabs.instance.showQuestion = 2; // instances of QuestionTabsComponent must be referenced explicitly
  //       break;
  //     case 3:
  //       this.showQuestion = this.navTabs.instance.showQuestion = 3;
  //       break;
  //     case 4:
  //       this.showQuestion = this.navTabs.instance.showQuestion = 4;
  //       break;
  //     case 5:
  //       this.showQuestion = this.navTabs.instance.showQuestion = 5;
  //       break;
  //   }
  // }

  getQuiz() {
    this.quizService.getQuiz().subscribe(quizes => {
      console.log(quizes);
      quizes.forEach( quiz => {
      let count = 0;
      if (this.user.completedQuizes) {
        this.user.completedQuizes.forEach(quizId => {
          console.log('Quiz ID from user: ' + quizId);
          console.log('quiz ID from server: ' + quiz.quizId)
          if (quizId !== quiz.quizId) {
            console.log('quizes not equal: ' + quizId + ' and ' + quiz.quizId);
            this.quiz = quiz;
          } else {
            count++;
          }
        });
      } else {
        this.quiz = quizes[0];
      }
      });
    });
    // this.quiz = new Quiz();
    // this.q1 = new Question();
    // this.q2 = new Question();
    // this.q3 = new Question();
    // this.q4 = new Question();
    // this.q5 = new Question();
    //
    // this.q1.answer = 'a';
    // this.q2.answer = 'blue';
    // this.q3.answer = '10';
    // this.q4.answer = 'Donald Trump';
    // this.q5.answer = 'Dog';
    //
    // this.q1.question = 'What is the first letter of the alphabet?';
    // this.q1.options = ['a', 'b', 'c', 'd'];
    //
    // this.q2.question = 'What color is the sky?';
    // this.q2.options = ['blue', 'indigo', 'grey', 'yellow'];
    //
    // this.q3.question = 'What is 5+5?';
    // this.q3.options = ['634', '99', '55', '10'];
    //
    // this.q4.question = 'Who is the current president of the USA?';
    // this.q4.options = ['Jerry Springer', 'Usain Bolt', 'Donald Trump', 'Mickey Mouse'];
    //
    // this.q5.question = 'What animal makes a woof sound?';
    // this.q5.options = ['Camel', 'Bear', 'Rabbit', 'Dog'];
    //
    // this.quiz.quizId = '1';
    // this.quiz.questions = [this.q1, this.q2, this.q3, this.q4, this.q5];
  }
}
