import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../model/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user = new User;

  constructor(private router: Router, public afAuth: AngularFireAuth, public userService: UserService) {
    this.userService.retrieveUserList().subscribe(list => {
      list.forEach(user => {
        if (user.email === this.afAuth.auth.currentUser.email) {
          this.setUser(user);
        }
      });
    });
  }

  ngOnInit() {
  }

  setUser(user) {
    this.user = user;
  }

}
