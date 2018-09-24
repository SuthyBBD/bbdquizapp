import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() hideSideNavigation = new EventEmitter();
  constructor(public user: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.user.logout();
  }
  onToggleHide() {
    this.hideSideNavigation.emit();
  }

}
