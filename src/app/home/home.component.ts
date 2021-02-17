import { SideNavService } from './../nav-menu/side-nav.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { User } from '../account/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  constructor(public sideNavService: SideNavService, private authservice: AuthService) {

    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this.sideNavService.hideSideNav = true;
     } else {
       this.sideNavService.hideSideNav = false;
     }
   }

  ngOnInit() {
  }

}
