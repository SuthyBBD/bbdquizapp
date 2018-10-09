import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email: string;
  displayName: string;
  password: string;
  error: any;

  constructor(private router: Router, public user: AuthService) { }

  ngOnInit() {
  }

  loginEmail() {
    this.user.loginEmail(this.email, this.password);
  }

  loginFacebook() {
    this.user.loginFacebook();
  }

  loginGoogle() {
    this.user.loginGoogle();
  }

}
