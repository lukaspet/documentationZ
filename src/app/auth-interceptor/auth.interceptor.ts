import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../common/services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { NotifierService } from 'angular-notifier';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly notifier: NotifierService;

  constructor(public auth: AuthService, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request)
    .pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        // catchError(this.handleError<any>('request Error'));
        return event;
      })
      // catchError(this.handleError<any>('request Error') // (err: HttpErrorResponse) => {
        // return throwError(err);
      // }
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    const token = this.auth.getToken();
    let decoded = null;
    if (token) {
      decoded = jwt_decode(token);
    }

    return (error: any): Observable<T> => {
      if (error.status === 401) {
        if (decoded) {
          if (decoded.exp.valueOf() < new Date().valueOf()) {
            // return Observable.throw(error);
              this.notifier.notify('warning', error.error);
              this.auth.logout();
              this.router.navigate(['/login']);
            }
        } else {
          this.notifier.notify('warning', error.error);
        }
      }
      if (error.status === 400) {
        this.notifier.notify('warning', error.error);
      }
      if (error.status === 200) {
        this.notifier.notify('success', error.error.text);
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(error);
      // return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
