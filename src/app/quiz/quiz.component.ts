import {
  AfterContentInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
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
export class QuizComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('quizComponent', {read: ViewContainerRef}) quizComponent;

  questions: Question[];
  quiz: Quiz;
  questionCounter = 1;

  submitted: boolean;
  quizFinished: boolean;
  quizStarted: boolean;
  allQuizesComplete: boolean;

  user = new User;
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

  ngOnDestroy() {
    if (this.dueTime) {
      this.dueTime.unsubscribe();
    }
  }

  ngAfterContentInit() {
    this.navTabsFactory = this.resolver.resolveComponentFactory(QuestionTabsComponent); // dynamically inject question tabs component
    this.navTabs = this.quizComponent.createComponent(this.navTabsFactory);
  }

  setCurrentUser() {
    this.userService.retrieveUserList().subscribe(list => {
      list.forEach(listItem => {
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
        if (this.userSelection === this.quiz.questions[questionNum - 1].answer) {
          this.userScore++;
          this.setSuccessMessage();
        } else {
          this.setFailMessage();
        }
    this.openSnackBar(this.message, this.action);
  }

  openSnackBar(message: string, action: string) {
    this.dueTime.unsubscribe();
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar'],
      duration: 2000
    });

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
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
    this.submitted = false;
    this.questionCounter++;
        this.showQuestion = this.navTabs.instance.showQuestion = this.questionCounter;
        this.startTimer(this.questionCounter);
        if ( this.questionCounter === 6) {
          this.showQuestion = this.navTabs.instance.showQuestion = 0;
          this.quizFinished = true;
          this.afterQuizComplete();
        }
    }

resetUser() {
  this.userService.updateUser(0, null);
  this.router.navigate(['/welcome']);
}

  afterQuizComplete() {
    this.quizService.setLastScore('' + this.userScore);
    let totalScore = this.userScore;
    if (this.user.score) {
      totalScore += Number(this.user.score);
    }
    this.completedQuizList = [this.quiz.quizId];
    if (this.user.completedQuizes) {
      this.user.completedQuizes.forEach(quiz => {
        this.completedQuizList.push(quiz);
      });
    }
    this.userService.updateUser(totalScore, this.completedQuizList);
    this.router.navigate(['/quiz-result']);
  }

  getQuiz() {
    this.quizService.getQuiz().subscribe(quizes => {
      quizes.forEach(quiz => {
        if (this.user.completedQuizes) {
          if (!this.user.completedQuizes.includes(quiz.quizId)) {
            this.quiz = quiz; // this will end up taking the last quiz not in the completed quiz array - this is acceptable behaviour
          }
        } else {
          this.quiz = quizes[0];
        }
      });
      if (!this.quiz) {
        this.allQuizesComplete = true;
      }
    });
  }
}
