import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Map<string, Set<string>>;

  constructor() { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = new Map();
    this.questions.set('What is an apple?', new Set(['APPLE', 'PEAR', 'MANGO', 'FROG']));
    this.questions.set('What is an dog?', new Set(['SUSAN', 'PIERCE', 'DOGGO', 'FRENCHIE']));
    this.questions.set('What is an house?', new Set(['FISH', 'RISOTTO', 'FELINE AIDS', 'TIK']));
    this.questions.set('What is a elephamt?', new Set(['MINCE', 'LITTLE GRANNY', 'FROG LUNGS', 'ANT FARM']));
  }
}
