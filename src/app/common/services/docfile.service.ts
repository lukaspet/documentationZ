import { DocFile } from './../../documents/docFile';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class DocfileService {
  // filesUri = 'https://localhost:44355/api/docfiles';
  // filesUri = 'http://localhost:59695/api/docfiles';
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService) {
    this.notifier = notifierService;
   }

  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/docfiles`;
  }
   /** GET files by id. Will 404 if id not found */
  getFiles(id: number): Observable < DocFile[] > {
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/currentDocument/${id}`;
    return this.http.get<DocFile[]>(url)
    .pipe(
      tap(_ => this.log(`fetched file with id=${id}`)),
      catchError(this.handleError<DocFile[]>(`getFiles id=${id}`, []))
    );
  }
   /** DOWNLOAD by id. Will 404 if id not found */
   downloadFile(docFile: DocFile): Observable < any > {
     const id = typeof docFile === 'number' ? docFile : docFile.fileId;
     const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
     return this.http.get(url, { responseType: 'blob' })
      .pipe(
        tap(_ => this.log(`downloaded file with id=${id}`)),
        catchError(this.handleError(`getDocFile id=${id}`))
    );
  }
 /** POST: add a new file to the server */
  addFile(position1: number, id: number, master1: number, file: File): Observable < DocFile > {
    // insert data to docFileAdd that is unnecesary need better solution!
    const docFileAdd: DocFile = { documentId: id, master: master1, fileName: 'null', fileId: 0, position: position1 };
    const formData: FormData = new FormData();
    // append document attributes
    formData.append('documentId', docFileAdd.documentId.toString());
    formData.append('master', docFileAdd.master.toString());
    formData.append('position', docFileAdd.position.toString());
    // append singleFile
    formData.append('file', file);
    return this.http.post<DocFile>(this.createCompleteRoute(this.envUrl.urlAddress), formData).pipe(
      tap((newDocFile: DocFile) => this.log(`added file with id=${newDocFile.fileId}`)),
      catchError(this.handleError<DocFile>('addFile'))
    );
  }
  viewFile(docFile: DocFile) {
    const tab = window.open();
    const id = typeof docFile === 'number' ? docFile : docFile.fileId;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.get(url, { responseType: 'blob' })
      .subscribe( data => {
        const fileURL = window.URL.createObjectURL(data);
        // let tab = window.open(); tab.location.href = fileURL;
        tab.location.href = fileURL;
        this.log(`viewed file with id=${id}`);
      });
  }
  deleteFile(docFile: DocFile): Observable < DocFile > {
    const id = typeof docFile === 'number' ? docFile : docFile.fileId;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.delete<DocFile>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted file with id=${id}`)),
      catchError(this.handleError<DocFile>('deletefile'))
    );
  }
  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 0) {
        this.notifier.notify('warning', 'No response from server. Check connection!');
      }
      if (error.status === 400) {
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
  /** Log a DocService message with the MessageService */
  private log(message: string) {
  }

}
