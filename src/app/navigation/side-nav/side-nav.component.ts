import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() hideSideNavigation = new EventEmitter();

  user;
  constructor(public userService: AuthService, public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.afAuth.authState.subscribe( authState => {
      if (authState && authState.uid) {
        this.user = authState.uid;
      } else {
        this.user = false;
      }
    });
  }
  logout() {
    this.userService.logout();
    this.checkLoggedIn();
  }
  onToggleHide() {
    this.hideSideNavigation.emit();
  }

}
