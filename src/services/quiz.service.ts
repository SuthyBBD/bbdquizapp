import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuizController} from '../app/api/quiz-controller';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private scoreSource = new BehaviorSubject('0');
  currentScore = this.scoreSource.asObservable();

  constructor(private quizController: QuizController) {
  }

  getQuiz() {
    return this.quizController.retrieveQuizListUsingGet();
  }

  setLastScore(score: string) {
    this.scoreSource.next(score);
  }

}
