import { AuthService } from './common/services/auth.service';
import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { User } from './account/user/user';
import { Observable } from 'rxjs/Observable';
import { SideNavService } from './nav-menu/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZanuttaDocumentazione';
  currentUser: User;
  isLoggedIn$: Observable<boolean>;
  constructor(private loadingBar: SlimLoadingBarService, private router: Router,
              public sideNavService: SideNavService) {
    // this.isLoggedIn$ = this.authservice.isLogged;
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    // this.authservice.currentUser.subscribe(x => this.currentUser = x);
    // if (!this.currentUser) {
    //   sideNavService.hideSideNav = true;
    // }
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
}
