import {Injectable, NgZone} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root' // makes this a singleton so we have one shared instance throughout the application
})
export class UserService {

  userList: AngularFireList<any>;
  user: any;
  constructor(private db: AngularFireDatabase, private router: Router, private zone: NgZone) {
  }

  createUser(user) {
    this.retrieveUserList();
    this.userList.set(user.uid, {
      name: user.displayName,
      email: user.email,
      completedQuizes: [],
      score: 0
    }).then( success => {
      this.zone.run(() => this.router.navigate(['/welcome'])); // executed outside of zone - > reenter angular zone using run
    });
  }

  retrieveUserList() {
  this.userList = this.db.list('users');
  return this.userList.snapshotChanges();
  }
}
