import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../../category/category';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/categorias`;
  }
  /** GET: get categories from server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched categorias',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: add a new category to the server */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.createCompleteRoute(this.envUrl.urlAddress), category, this.httpOptions).pipe(
     tap((newCategory: Category) => this.loggingservice.info(`added category with id=${newCategory.id}`,
     this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()),
     );
  }
   /** PUT: update the category on the server */
   editCategory(category: Category): Observable<any> {
    const id = category.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, category, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated category id=${category.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()),
    );
  }
  /** DELETE: delete category from server */
  deleteCategory(category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Category>(url, this.httpOptions)
    .pipe(
      tap(_ => this.loggingservice.info(`deleted category id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()),
      // catchError(this.handleError<Category>('deleteCategory'))
    );
  }
}
