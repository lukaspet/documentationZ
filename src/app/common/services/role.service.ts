import { LoggingService } from './logging.service';
import { Role } from './../../account/role/role';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/aspnetroles`;
  }
  /** GET: get roles from server */
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched roles',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: add a new part3 to the server */
  addRole(role: Role): Observable<Role> {
  return this.http.post<Role>(this.createCompleteRoute(this.envUrl.urlAddress), role, this.httpOptions).pipe(
      tap((newRole: Role) => this.loggingservice.info(`added role w/ id=${newRole.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the part3 on the server */
  editRole(role: Role): Observable<any> {
    const id = role.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, role, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated role id=${role.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delte role from server */
  deleteRole(role: Role | number): Observable<Role> {
    const id = typeof role === 'number' ? role : role.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Role>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted Role id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
