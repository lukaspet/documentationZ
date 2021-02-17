import { ChangePasswordComponent } from './../../account/user/change-password/change-password.component';
import { User } from '../../account/user/user';
import { AuthService } from './../../common/services/auth.service';
import { SideNavService } from './../side-nav.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  constructor(public sideNavService: SideNavService, private authservice: AuthService, private modalService: NgbModal) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    // this.authservice.isLoggedIn().subscribe(value => this.isLoggedIn$ = value);
    this.isLoggedIn$ = this.authservice.isLogged;
   }
  openPasswordChange() {
    this.modalService.open(ChangePasswordComponent); // go to changePasswordComponent
  }
  ngOnInit() {
  }
}
