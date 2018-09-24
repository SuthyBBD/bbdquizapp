import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  error: string;

  constructor(public user: AuthService) { }

  ngOnInit() {
  }

  register() {
    if (this.password === this.confirmPassword) {
      this.user.register(this.email, this.password);
    } else {
      this.error = 'Please ensure passwords match';
    }
  }

  resetNotification() {
    this.error = '';
  }

}
