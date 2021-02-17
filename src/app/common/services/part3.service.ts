import { LoggingService } from './logging.service';
import { Part3 } from './../../part3/part3';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class Part3Service {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/parte3`;
  }
  /** GET: get part3s from server */
  getPart3(): Observable<Part3[]> {
    return this.http.get<Part3[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched part3',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
 /** POST: add a new part3 to the server */
  addPart3(part3: Part3): Observable<Part3> {
  return this.http.post<Part3>(this.createCompleteRoute(this.envUrl.urlAddress), part3, this.httpOptions).pipe(
      tap((newPart3: Part3) => this.loggingservice.info(`added part3 w/ id=${newPart3.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the part3 on the server */
  editPart3(part3: Part3): Observable<any> {
    const id = part3.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, part3, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated part3 id=${part3.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete part3 from server */
  deletePart3(part3: Part3 | number): Observable<Part3> {
    const id = typeof part3 === 'number' ? part3 : part3.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Part3>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted part3 id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
