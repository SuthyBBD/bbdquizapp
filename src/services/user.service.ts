import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../app/model/user';

@Injectable({
  providedIn: 'root' // makes this a singleton so we have one shared instance throughout the application
})
export class UserService {

  userList: AngularFireList<any>;
  user: User;
  displayName: string;

  constructor(private db: AngularFireDatabase, private fireAuth: AngularFireAuth, private router: Router) {
  }

  createUser(user, name?) {
    this.retrieveUserList();
    if (name) {
      this.displayName = name;
    } else {
      this.displayName = user.displayName;
    }
    this.userList.update(user.uid, { // for lack of a better approach, using update instead of create so user score and quizes are not wiped
      name: this.displayName,
      email: user.email
    });
  }

  updateUser(score, completedQuizes) {
    const userId = this.fireAuth.auth.currentUser.uid;
    this.retrieveUserList();
    this.userList.update(userId, {
      score: score,
      completedQuizes: completedQuizes
    });
  }

  retrieveUser(email) {
     this.retrieveUserList().subscribe(list => {
       list.forEach(user => {
         if (user.email === email) {
           this.user = user;
         }
       });
     });
  }

  retrieveUserList() {
    this.userList = this.db.list('users');
    return this.userList.valueChanges();
  }
}
