import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authservice.currentUserValue;
      const isLoggedIn = this.authservice.isLogged;
      // if (currentUser) { // TO DO WHEN IMPLEMENTING ROLES
      //   // check if route is restricted by role
      //   if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     this.router.navigate(['/']);
      //     return false;
      // }
      // }
      return this.authservice.isLogged
      .pipe(
        take(1),
        map((isLogged: boolean) => {
          if (!isLogged) {
            window.alert('Access not allowed!');
            this.router.navigate(['/home']);
            return false;
          }
          if (currentUser) {
            if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
              this.router.navigate(['/']);
              window.alert('Succcca!');
              return false;
          }
        }
          return true;
        }));

      // if (this.authservice.isLogged) { // OPTION 2 NOT WORKING AT THE MOMENT
      //   window.alert('Access not allowed!');
      //   this.router.navigate(['/login']);
      // }
      // return true;
    }

}
