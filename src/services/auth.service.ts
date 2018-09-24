import { Injectable } from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {map, switchMap} from 'rxjs/internal/operators';
import { auth } from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';

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

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  loginFacebook() {
    this.fireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(
      (success) => {
        this.router.navigate(['/welcome']);
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }
  loginGoogle() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      (success) => {
        this.router.navigate(['/welcome']);
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }
  loginEmail() {
    this.fireAuth.auth.signInWithPopup(new auth.EmailAuthProvider()).then(
      (success) => {
        this.router.navigate(['/welcome']);
      }).catch(
      (err) => {
        this.error = err;
      }
    );
  }

  register(email, password) {
    // TODO put validation
    if (true) {
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password
      ).then(
        (success) => {
          this.router.navigate(['/login']);
        }).catch(
        (err) => {
          this.error = err;
        });
    }
  }

  logout () {
    this.fireAuth.auth.signOut();
  }
}
