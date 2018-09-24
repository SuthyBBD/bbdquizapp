import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userScore: string;
  constructor(private router: Router, public user: AuthService) {}

  ngOnInit() {
    this.userScore = this.user.score;
  }

}
