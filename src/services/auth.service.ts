import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {map, switchMap} from 'rxjs/internal/operators';
import {auth} from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {User} from '../app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: string;
  score: string;

  uid = this.fireAuth.authState.pipe(
    map(authState => {
        if (!authState) {
          return null;
        } else {
          return authState.uid;
        }
      }
    ));

  isUser: Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return observableOf(false);
      } else {
        return this.db.object<boolean>('/users/' + uid).valueChanges();
      }
    })
  );

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase,
              private router: Router,
              private userService: UserService) {
  }

  loginFacebook() {
    this.fireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(
      (success) => {
        if (this.fireAuth.auth.currentUser) { // todo check if user exists
          this.userService.createUser(this.fireAuth.auth.currentUser); // userService is a singleton
        }
      }).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  loginGoogle() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (success) => {
        if (this.fireAuth.auth.currentUser) { // todo check if user exists
          this.userService.createUser(this.fireAuth.auth.currentUser); // userService is a singleton
        }
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }

  loginEmail(email, password) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
      (success) => {
        this.router.navigate(['/welcome']);
      }).catch(
      (err) => {
        return err;
      }
    );
    return null;
  }

  register(email, password, name) {
    if (!this.userExists(email)) {
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(
          (userCredential) => {
            if (userCredential.user) {
              userCredential.user.displayName = name;
              this.userService.createUser(userCredential.user);
              this.router.navigate(['/login']);
            }
          })
        .catch(
          err => {
            this.error = err;
            console.log(err);
            return err;
          });
    } else {
      return false;
    }
  }

  userExists(email) {
    this.db.database.ref('users').orderByKey().once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          childSnapshot.forEach(childOfChildSnapshot => {
            if (email === childOfChildSnapshot.val()) {
              //....
            }
          });
          return false;
        });
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
  }
}
