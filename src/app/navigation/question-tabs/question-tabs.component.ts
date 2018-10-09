import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-tabs',
  templateUrl: './question-tabs.component.html',
  styleUrls: ['./question-tabs.component.css']
})
export class QuestionTabsComponent implements OnInit {
  constructor() { }

  @Input() showQuestion = 1;

  ngOnInit() {
  }
}
