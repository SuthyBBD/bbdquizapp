import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

  constructor(private router: Router, private fireAuth: AngularFireAuth) {

  }

  canActivate(): Observable<boolean> | boolean {
    if (this.fireAuth.auth.currentUser) {
      return true;
    } else {
    this.router.navigate(['/login']);
    }
  }


}
