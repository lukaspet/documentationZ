import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Document } from '../../documents/document';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';

@Injectable(
{
  providedIn: 'root'
})
export class DocumentService {
  // documentsUri = 'https://localhost:44355/api/documents';
  // documentsUri = 'http://localhost:59695/api/documents';
  // documentsUri = '/api/documents';
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  httpOptions1 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response'
  };

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService) {
    this.notifier = notifierService;
   }
  private createCompleteRoute( envAddress: string) {
    return `${envAddress}/documents`;
  }
  getDocuments(): Observable<HttpResponse<Document[]>> {
    return this.http.get<Document[]>(this.createCompleteRoute(this.envUrl.urlAddress), { observe: 'response'})
    .pipe(
      tap(_ => this.log('fetched documents')),
      catchError(this.handleError<HttpResponse<Document[]>>('getDocumnets'))
    );
  }
   /** GET document by id. Will 404 if id not found */
   getDocument(id: number): Observable<Document> {
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.get<Document>(url).pipe(
      tap(_ => this.log(`fetched document id=${id}`)),
      catchError(this.handleError<Document>(`getDocument id=${id}`))
    );
  }
 /** POST: add a new document to the server */
  addDocument(document: Document, files: File[], file: File[]): Observable<Document> {
    document.dataArchivio = new Date(Date.now());
    const formData: FormData = new FormData();
    // append document attributes
    formData.append('societaId', document.societaId.toString());
    formData.append('categoriaId', document.categoriaId.toString());
    formData.append('sottocategoriaId', document.sottocategoriaId.toString());
    formData.append('ufficioId', document.ufficioId.toString());
    formData.append('descrizioneDocumento', document.descrizioneDocumento);
    formData.append('parte2Id', document.parte2Id.toString());
    formData.append('parte3Id', document.parte3Id.toString());
    formData.append('dataDocumento', (new Date(document.dataDocumento)).toUTCString());
    formData.append('cartella', document.cartella);
    formData.append('posizioneCartella', document.posizioneCartella);
    formData.append('note', document.note);
    formData.append('dataArchivio', (new Date(document.dataArchivio)).toUTCString());
    // append manyFiles
    if (files.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0 ; i < files.length ; i++) {
        formData.append('files', files[i]);
      }
    }
    // append singleFile
    if (file.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0 ; i < file.length ; i++) {
        formData.append('file', file[i]);
      }
    }
    return this.http.post<Document>(this.createCompleteRoute(this.envUrl.urlAddress), formData)
    .pipe(
      tap((newDocument: Document) => this.log(`added document with id=${newDocument.documentId}`)),
      catchError(this.handleError<Document>('addDocument'))
    );
  }
 /** PUT: update the document on the server */
  updateDocument(document: Document): Observable<any> {
    const id = document.documentId;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, document, this.httpOptions).pipe(
      tap(_ => this.log(`updated document id=${document.documentId}`)),
      catchError(this.handleError<any>('updatedDocument'))
    );
  }
  deleteDocument(document: Document | number): Observable<Document> {
    const id = typeof document === 'number' ? document : document.documentId;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Document>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted document id=${id}`)),
      catchError(this.handleError<Document>('deleteDocument'))
    );
  }
  getSearchDocument(document: any, currentPage: number): Observable<HttpResponse<Document[]>> {
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/search`;
    let params = new HttpParams();
    if (document.searchText) {
      params = params.append('searchText', document.searchText.toString());
    }
    if (document.categoriaId) {
      params = params.append('categoriaId', document.categoriaId.toString());
    }
    if (document.dataDocumento) {
      params = params.append('startDate', new Date(document.dataDocumento[0]).toUTCString());
      params = params.append('endDate', new Date(document.dataDocumento[1]).toUTCString());
    }
    if (document.societaId) {
      params = params.append('societaId', document.societaId.toString());
    }
    if (document.sottocategoriaId) {
      params = params.append('sottocategoriaId', document.sottocategoriaId.toString());
    }
    if (document.ufficioId) {
      params = params.append('ufficioId', document.ufficioId.toString());
    }
    if (document.parte2Id) {
      params = params.append('parte2Id', document.parte2Id.toString());
    }
    if (document.parte3Id) {
      params = params.append('parte3Id', document.parte3Id.toString());
    }
    params = params.append('currentPage', currentPage.toString());

    return this.http.get<Document[]>(url, {params, observe: 'response'})
    .pipe(
      tap(_ => this.log('fetched search documents')),
      catchError(this.handleError<HttpResponse<Document[]>>('getDocumnets'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 0) {
        this.notifier.hideOldest();
        this.notifier.notify('warning', 'No response from server. Check connection!');
      }
      // if (error.status === 400) {
      //   this.notifier.notify('warning', error.error);
      // }

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a DocumentService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
