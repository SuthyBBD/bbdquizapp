import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Quiz} from '../app/model/quiz';
import {QuizController} from '../app/api/quiz-controller';
import {User} from '../app/model/user';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private quizController: QuizController) {
  }

  quizObs$: Observable<Quiz[]>;
  quiz: any;

  getQuiz() {
   return this.quizController.retrieveQuizListUsingGet();
  }

}
