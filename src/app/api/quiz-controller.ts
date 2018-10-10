import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Quiz} from '../model/quiz';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizController {

  constructor(private httpClient: HttpClient) {}


  retrieveQuizListUsingGet(): Observable<Quiz[]> {
    return this.httpClient
      .get<Quiz[]>('/get-quiz');
  }
}
