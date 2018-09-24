import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, of as observableOf} from 'rxjs';
import {first, take} from 'rxjs/internal/operators';


const PATH = process.env.PATH;

@Injectable()
export class ManagerAuthGuard implements CanActivate {
  role: string;


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
