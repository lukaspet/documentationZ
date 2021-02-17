import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../company/company';
import { tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private loggingservice: LoggingService) {}

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/societas`;
  }
  /** GET: get companies from server */
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(_ => this.loggingservice.info('fetched categorias',
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** POST: add a new company to the server */
  addCompany(company: Company): Observable<Company> {
  return this.http.post<Company>(this.createCompleteRoute(this.envUrl.urlAddress), company, this.httpOptions).pipe(
      tap((newCompany: Company) => this.loggingservice.info(`added company with id=${newCompany.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** PUT: update the company on the server */
  editCompany(company: Company): Observable<any> {
    const id = company.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, company, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`updated company id=${company.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
  /** DELETE: delete company from server */
  deleteCompany(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Company>(url, this.httpOptions).pipe(
      tap(_ => this.loggingservice.info(`deleted company id=${id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
}
