import { SideNavService } from './../../nav-menu/side-nav.service';
import { SearchService } from './search.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';
import { User } from '../../account/user/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private router: Router, private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService,
              private searchservice: SearchService, private sideNavService: SideNavService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.notifier = notifierService;
   }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/login`;
  }
  setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
  }
  login(email: string, password: string) {
    return this.http.post<any>(this.createCompleteRoute(this.envUrl.urlAddress), {email, password}, this.httpOptions).pipe(
    map(user => {
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setUser(user);
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // localStorage.setItem('token', JSON.stringify(user.token));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.loggedIn.next(true);
      }
      return user;
      }) // ,
      // catchError(err => {
      //  this.handleError<any>('login error');
      //   return throwError(err);
      // })
    );
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token'); // on page reload fill BehaviorSubject loggedIn
  }
  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    this.searchservice.clearSearchResutl();
    // this.sideNavService.hideSideNav = true;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 0) {
        this.notifier.notify('warning', 'No response from server. Check connection!');
      }
      if (error.status === 400 || error.status === 401) {
        this.notifier.notify('warning', error.error);
      }
      if (error.status === 404) {
        this.notifier.notify('error', error.error);
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
