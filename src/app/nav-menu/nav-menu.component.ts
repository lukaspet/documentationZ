import { AuthService } from './../common/services/auth.service';
import { SideNavService } from './side-nav.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../account/user/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  // isExpanded = false;
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  constructor(public sideNavService: SideNavService, private authservice: AuthService) { }

  ngOnInit() {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.isLoggedIn$ = this.authservice.isLogged;
  }
  get isAdminOrOperator() {
    return this.currentUser && (this.currentUser.role === 'Admin' || this.currentUser.role === 'Operator'
    || this.currentUser.role === 'OperatorSpa');
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  stopPropagation(event) {
    console.log(event + 'clicked');
    }
}
