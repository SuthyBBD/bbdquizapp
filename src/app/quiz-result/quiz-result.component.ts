import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../model/user';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  user = new User;
  userScore;

  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, public userService: UserService, public quizService: QuizService) {
    this.userService.retrieveUserList().subscribe(list => {
      list.forEach(user => {
        if (user.email === this.afAuth.auth.currentUser.email) {
          this.user = user;
        }
      });
    });
  }

  ngOnInit() {
    this.quizService.currentScore.subscribe(score => this.userScore = score);}

}
