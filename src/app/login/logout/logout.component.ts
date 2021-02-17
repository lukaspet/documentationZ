import { LoggingService } from './../../common/services/logging.service';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from '../../nav-menu/side-nav.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private zservice: ZanuttaService, public sideNavService: SideNavService,
              private loggingservice: LoggingService) {}

  ngOnInit() {
    this.loggingservice.info('User logged out', '/logout');
    this.zservice.logout();
    // this.sideNavService.hideSideNav = false;
    this.router.navigate(['/login']);
  }
}
// This is our component to log out of the site,
// and it's just a simple class to clean out the 'localStorage'.
