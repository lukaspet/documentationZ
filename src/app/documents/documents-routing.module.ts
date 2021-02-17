import { DocumentDownloadComponent } from './document-download/document-download.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentGetComponent } from '../documents/document-get/document-get.component';
import { DocumentEditComponent } from '../documents/document-edit/document-edit.component';
import { DocumentAddComponent } from '../documents/document-add/document-add.component';
import { AuthGuard } from './../auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: DocumentGetComponent, canActivate : [AuthGuard],
    data: { roles: ['Admin', 'Operator', 'OperatorSpa', 'Guest', 'GuestSpa']}
  },
  {
    path: 'create', component: DocumentAddComponent, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
  },
  {
    path: 'edit/:id', component: DocumentEditComponent, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
  },
  {
    path: 'download/:id', component: DocumentDownloadComponent, canActivate : [AuthGuard],
    data: { roles: ['Admin', 'Operator', 'OperatorSpa', 'Guest', 'GuestSpa']}
  },
  // {
  //   path: 'view', component: DocumnetViewComponent, canActivate : [AuthGuard],
  //   data: { roles: ['Admin', 'Operator', 'OperatorSpa', 'Guest', 'GuestSpa']}
  // },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
