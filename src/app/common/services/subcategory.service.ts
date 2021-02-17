import { LoggingService } from './logging.service';
import { Subcategory } from './../../subcategory/subcategory';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/sottocategorias`;
  }
  /** GET: get subcategories from server */
  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched subcategories',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** GET: get list of subcategories by category id from server */
  getSubcategoriesList(catId: number): Observable<Subcategory[]> {
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/currentCategory/${catId}`;
    return this.http.get<Subcategory[]>(url).pipe(
      tap(_ => this.loggingservice.info(`fetched subcategory list by category id=${catId}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: add a new subcategory to the server */
  addSubcategory(subcategory: Subcategory): Observable<Subcategory> {
  return this.http.post<Subcategory>(this.createCompleteRoute(this.envUrl.urlAddress), subcategory, this.httpOptions).pipe(
      tap((newSubcategory: Subcategory) => this.loggingservice.info(`added subcategory id=${newSubcategory.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the subcategory on the server */
  editSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    const id = subcategory.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put<Subcategory>(url, subcategory, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated subcategory id=${subcategory.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete subcategory from server */
  deleteSubcategory(subcategory: Subcategory | number): Observable<Subcategory> {
    const id = typeof subcategory === 'number' ? subcategory : subcategory.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Subcategory>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted subcategory id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
