import {Injectable, NgZone} from '@angular/core';
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
  currentUser: any;

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
              private userService: UserService,
              private ngZone: NgZone) {
  }

  loginFacebook() {
    this.fireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(
      (success) => {
        if (this.fireAuth.auth.currentUser) {
          this.currentUser = this.fireAuth.auth.currentUser;
          this.userService.createUser(this.currentUser);
        }
        this.ngZone.run( () => this.router.navigate(['/welcome']));
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }

  loginGoogle() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (success) => {
        if (this.fireAuth.auth.currentUser) { // todo check if user exists
          this.currentUser = this.fireAuth.auth.currentUser;
          this.userService.createUser(this.currentUser); // userService is a singleton
        }
        this.ngZone.run( () => this.router.navigate(['/welcome']));
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }

  loginEmail(email, password) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(
      (success) => {
        if (this.fireAuth.auth.currentUser) {
          this.currentUser = this.fireAuth.auth.currentUser;
        }
        this.ngZone.run( () => this.router.navigate(['/welcome']));
      }).catch(
      (err) => {
        this.error = err.message;
        return err;
      }
    );
  }

  register(email, password, name) {
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(
          (userCredential) => {
            if (userCredential.user) {
              this.userService.createUser(userCredential.user, name);
              this.ngZone.run(() => this.router.navigate(['/login']));
            }
          })
        .catch(
          err => {
            this.error = err;
          });
  }

  userExists(email) {
    this.db.database.ref('users').orderByKey().once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          childSnapshot.forEach(childOfChildSnapshot => {
            if (email === childOfChildSnapshot.val()) {
              // todo
            }
          });
          return false;
        });
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.ngZone.run(() => this.router.navigate(['/login']));
  }
}
