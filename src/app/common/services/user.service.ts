import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';
import { User } from '../../account/user/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { ChangePassword } from '../../helpers/changePassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService,
              private authservice: AuthService) {
  }
  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/account`;
  }
  /** GET: get users from server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched users',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
 /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
  return this.http.post<User>(this.createCompleteRoute(this.envUrl.urlAddress), user, this.httpOptions).pipe(
      tap((newUser: User) => this.loggingservice.info(`added user w/ id=${newUser.fullName}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the user on the server */
  editUser(user: User): Observable<any> {
    const id = user.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated user id=${user.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete user from server */
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted user id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: update user password */
  changePassword(changePassword: ChangePassword): Observable<any> {
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/changepassword`;
    return this.http.post<ChangePassword>(url, changePassword, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`password changed w/ user=${this.authservice.currentUserValue}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
