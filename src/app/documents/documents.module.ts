import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentEditComponent } from '../documents/document-edit/document-edit.component';
import { DocumentAddComponent } from '../documents/document-add/document-add.component';
import { DocumentGetComponent } from '../documents/document-get/document-get.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropDirective } from './../drag-drop.directive';
import { DragDropFileDirective } from './../drag-drope-file.directive';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumnetViewComponent } from './documnet-view/documnet-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TopNavComponent } from '../nav-menu/top-nav/top-nav.component';

@NgModule({
  declarations: [
    DocumentGetComponent,
    DocumentAddComponent,
    DocumentEditComponent,
    DocumentDownloadComponent,
    DragDropDirective,
    DragDropFileDirective,
    DocumnetViewComponent,
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    NgxDocViewerModule,
    NgxSpinnerModule,
  ],
  // exports: [
  //   DocumentGetComponent,
  //   DocumentAddComponent,
  //   DocumentEditComponent
  // ]
})
export class DocumentsModule { }
