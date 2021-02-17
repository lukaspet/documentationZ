import { LoggingService } from './logging.service';
import { Part2 } from './../../part2/part2';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class Part2Service {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/parte2`;
  }
  /** GET: get part2s from server */
  getPart2(): Observable<Part2[]> {
    return this.http.get<Part2[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched part2',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: add a new part2 to the server */
  addPart2(part2: Part2): Observable<Part2> {
  return this.http.post<Part2>(this.createCompleteRoute(this.envUrl.urlAddress), part2, this.httpOptions).pipe(
      tap((newPart2: Part2) => this.loggingservice.info(`added part2 with id=${newPart2.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
     /** PUT: update the part2 on the server */
  editPart2(part2: Part2): Observable<any> {
    const id = part2.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, part2, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated part2 with id=${part2.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete part2 from server */
  deletePart2(part2: Part2 | number): Observable<Part2> {
    const id = typeof part2 === 'number' ? part2 : part2.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Part2>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted part2 with id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
