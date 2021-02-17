import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Office } from '../../offices/office';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/ufficios`;
  }
  /** GET: get offices from server */
  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched offices',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
 /** POST: add a new office to the server */
  addOffice(office: Office): Observable<Office> {
  return this.http.post<Office>(this.createCompleteRoute(this.envUrl.urlAddress), office, this.httpOptions).pipe(
    tap((newOffice: Office) => this.loggingservice.info(`added office with id=${newOffice.id}`,
    this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the office on the server */
  editOffice(office: Office): Observable<any> {
    const id = office.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, office, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated office id=${office.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete office from server */
  deleteOffice(office: Office | number): Observable<Office> {
    const id = typeof office === 'number' ? office : office.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Office>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted office with id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
