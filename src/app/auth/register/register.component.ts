import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  error: string;

  constructor(public user: AuthService, public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.password === this.confirmPassword) {
      if (!this.user.register(this.email, this.password, this.displayName)) {
        this.error = 'This user already exists';
      }
    } else {
      this.error = 'Please ensure passwords match';
    }
  }

  resetNotification() {
    this.error = '';
  }

}
