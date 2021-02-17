import { DocFile } from './../docFile';
import { Part3 } from './../../part3/part3';
import { Part2 } from './../../part2/part2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Document } from './../document';
import { Subcategory } from './../../subcategory/subcategory';
import { Category } from './../../category/category';
import { Office } from '../../offices/office';
import { Company } from '../../company/company';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../common/services/auth.service';
import { User } from '../../account/user/user';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  currentUser: User;
  categories: Category[];
  subcategories: Subcategory[];
  offices: Office[];
  companies: Company[];
  part2: Part2[];
  part3: Part3[];
  document: Document;
  docFiles: DocFile[];
  docFilesArray: any = [];
  docFilesOld: any = [];
  docFileOld: any; // to store file on init - document file
  docFile: DocFile;
  docFileArray: any;
  pipe = new DatePipe('en-US');
  documentForm: FormGroup;
  docUpdate: Document = { documentId: null, societaId: null,
  ufficioId: null, cartella: null, sottocategoriaId: null, categoriaId: null, dataDocumento: null,
  descrizioneDocumento: null, parte2Id: null, parte3Id: null, posizioneCartella: null, note: null, dataArchivio: null  };

  constructor(private route: ActivatedRoute, private router: Router, private zservice: ZanuttaService, private fb: FormBuilder,
              private modalService: NgbModal, private authservice: AuthService) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    this.createFormGroup();
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  get isAdminOrOperator() {
    return this.currentUser && (this.currentUser.role === 'Admin' || this.currentUser.role === 'Operator'
    || this.currentUser.role === 'OperatorSpa');
  }
  ngOnInit() {
    this.getPart2();
    this.getPart3();
    this.getOffices();
    this.getCompanies();
    this.getCategories();
    this.getSubcategories();
    this.getFiles();
    this.getDocument();
  }
  getFiles(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zservice.getFiles(id)
    .subscribe(docFiles => {
      this.docFiles = docFiles;
      this.docFiles.sort((a, b) => a.position - b.position);
      const index = this.docFiles.findIndex(e => e.master === 1);
      this.docFile = this.docFiles.filter(e => e.master === 1)[0];
      this.docFileOld = Object.assign([], this.docFiles.filter(e => e.master === 1)[0]);
      this.docFiles.splice(index, 1);
      this.docFilesOld = Object.assign([], this.docFiles);
      this.documentForm.patchValue({
        oneFile: this.docFile.fileName,
        manyFiles: this.docFiles,
      });
    });
  }
  createFormGroup() {
    this.documentForm = this.fb.group({
    societaId: ['', [Validators.required]],
    categoriaId: ['', [Validators.required]],
    sottocategoriaId: ['', [Validators.required]],
    ufficioId: ['', [Validators.required]],
    descrizioneDocumento: ['', Validators.required],
    oneFile: ['', Validators.required],
    parte2Id: [''],
    parte3Id: [''],
    dataDocumento: [new Date(), Validators.required],
    dataArchivio: [''],
    cartella: [''],
    note: [''],
    posizioneCartella: [''],
    manyFiles: [''],
    });
  }
  addFile(position: number, master: number, file: File) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zservice.addFile(position, id, master, file)
      .subscribe(docFile => {
        if (docFile.master === 1) { // if new file is master then add it to docFile array else to docFiles!
          this.docFile = docFile;
        } else {
          this.docFiles.push(docFile);
        }
      });
  }
  getDocument() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zservice.getDocument(id)
    .subscribe(document => {
      this.document = document;
      this.documentForm.patchValue({
        cartella: this.document.cartella,
        dataDocumento: new Date(this.pipe.transform(this.document.dataDocumento, 'short')),
        dataArchivio: this.pipe.transform(this.document.dataArchivio, 'dd/MM/yyyy'),
        descrizioneDocumento: this.document.descrizioneDocumento,
        note: this.document.note,
        ufficioId: this.document.ufficioId,
        posizioneCartella: this.document.posizioneCartella,
        sottocategoriaId: this.document.sottocategoriaId,
        categoriaId: this.document.categoriaId,
        societaId: this.document.societaId,
        parte3Id: this.document.parte3Id,
       });
      if (!this.document.parte2Id) {
        this.documentForm.patchValue({
          parte2Id: '' });
      } else {
        this.documentForm.patchValue({
          parte2Id: this.document.parte2Id, });
      }
      if (!this.document.parte3Id) {
        this.documentForm.patchValue({
          parte3Id: '' });
      } else {
        this.documentForm.patchValue({
          parte3Id: this.document.parte3Id, });
      }
    });
  }
  getSubcategories(): void {
    this.zservice.getSubcategories()
    .subscribe(subcategories => this.subcategories = subcategories);
  }
  getCategories(): void {
    this.zservice.getCategories()
    .subscribe(categories => this.categories = categories);
  }
  getOffices(): void {
    this.zservice.getOffices()
    .subscribe(offices => this.offices = offices);
  }
  getCompanies(): void {
    this.zservice.getCompanies()
    .subscribe(companies => this.companies = companies);
  }
  getPart2(): void {
    this.zservice.getPart2()
    .subscribe(part2 => {
      this.part2 = part2;
      this.part2.sort((a, b) => a.nomeParte2.localeCompare(b.nomeParte2));
   });
  }
  getPart3(): void {
    this.zservice.getPart3()
    .subscribe(part3 => {
      this.part3 = part3;
      this.part3.sort((a, b) => a.nomeParte3.localeCompare(b.nomeParte3));
   });
  }
  onChangeCategory(catId: number) {
    this.zservice.getSubcategoriesList(catId)
    .subscribe(subcategories => {
        this.subcategories = subcategories;
        this.documentForm.patchValue({
          sottocategoriaId: '',
        });
      });
  }
  public noSubcategory(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
}
  getSubcategoriesShown() {
    return this.subcategories;
  }
  uploadFiles(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const elements = event[index];
      if ( this.docFile.fileName !== elements.name) { // check if file exists in docFile - single file
        if (!this.docFilesArray.some(e => e.name === elements.name)) { // check if file exists in docFilesArray
          if (!this.docFiles.some(e => e.fileName === elements.name)) { // check if file exists in docFiles
            this.docFilesArray.push(elements as File);
            const newFile = new DocFile();
            newFile.fileName = elements.name;
            this.docFiles.push(newFile);
            this.documentForm.controls.manyFiles.markAsDirty();
          }
        }
      }
    }
  }
  uploadFile(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      if ( !this.docFiles.some(e => e.fileName === element.name)) {
        if (this.docFile === null) {
          this.docFileArray = element as File;
          this.docFile = new DocFile ();
          this.docFile.fileName = element.name;
          this.documentForm.patchValue({
            oneFile: element.name
          });
          this.documentForm.controls.oneFile.markAsDirty();
        } else { alert('Prima cancellare il file!'); }
      }
    }
  }
  deleteAttachment() {
    this.modalService.dismissAll();
    this.docFile = null;
    this.docFileArray = null;
    this.documentForm.patchValue({
          oneFile: '',
        });
    this.documentForm.controls.oneFile.markAsDirty();
  }
  deleteAttachments(index) {
    this.modalService.dismissAll();
    if (this.docFilesArray !== null) {
      this.docFilesArray.splice(e => e.name === this.docFiles[index].fileName);
    }
    this.docFiles.splice(index, 1);
    if (this.docFiles.length === 0) {
      this.documentForm.patchValue({
        manyFiles: '',
      });
    }
    this.documentForm.controls.manyFiles.markAsDirty();
  }
  deleteFile(docFile: DocFile) {
    this.zservice.deleteFile(docFile).subscribe();
  }
  onSubmit() {
    this.addRemoveDocFile();
    this.addRemoveAttachments(); // add and remove attachments
    this.updateDocument();
    // TODO: Use EventEmitter with form value
  }
  addRemoveDocFile() {
    // if this.docFile of type DocFile is empty then it was removed and new file should be uploaded!
    if (this.docFile.fileName !== this.docFileOld.fileName || this.docFile === undefined) {
      const master = 1;
      const position = 1;
      this.deleteFile(this.docFileOld); // delete file which was removed
      this.addFile(position, master, this.docFileArray); // only first item of array - only one document possible
    }
  }
  addRemoveAttachments() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.docFilesOld.length; i++) {
      if (!this.docFiles.some(e => e.fileName === this.docFilesOld[i].fileName)) {
        this.zservice.deleteFile(this.docFilesOld[i]).subscribe();
      }
    }
    const master = 0;
    let position = 2;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.docFilesArray.length; index++) {
      if (!this.docFilesOld.some(e => e.fileName === this.docFilesArray[index].fileName)) {
        // tslint:disable-next-line: prefer-for-of
        for (position; position < 100; position++) {
          if (!this.docFiles.some(e => e.position === position)) {
            this.addFile(position, master, this.docFilesArray[index]);
            position++;
            break;
          }
        }
      }
    }
  }
  updateDocument() {
    this.docUpdate.documentId = +this.route.snapshot.paramMap.get('id'),
    this.docUpdate.categoriaId = this.documentForm.get('categoriaId').value,
    this.docUpdate.sottocategoriaId = this.documentForm.get('sottocategoriaId').value,
    this.docUpdate.ufficioId = this.documentForm.get('ufficioId').value,
    this.docUpdate.descrizioneDocumento = this.documentForm.get('descrizioneDocumento').value,
    this.docUpdate.parte2Id = this.documentForm.get('parte2Id').value,
    this.docUpdate.societaId = this.documentForm.get('societaId').value,
    this.docUpdate.parte3Id = this.documentForm.get('parte3Id').value,
    this.docUpdate.dataDocumento = this.documentForm.get('dataDocumento').value,
    this.docUpdate.dataArchivio = this.document.dataArchivio,
    this.docUpdate.cartella = this.documentForm.get('cartella').value,
    this.docUpdate.posizioneCartella = this.documentForm.get('posizioneCartella').value,
    this.docUpdate.note = this.documentForm.get('note').value;
    if (this.docUpdate.cartella) {
      this.docUpdate.cartella = this.docUpdate.cartella.trim();
    }
    if (this.docUpdate.posizioneCartella) {
      this.docUpdate.posizioneCartella = this.docUpdate.posizioneCartella.trim();
    }
    this.zservice.updateDocument(this.docUpdate)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(() =>
        this.router.navigate(['/documents'])
    );
  }
  downloadFile(docFile: DocFile): void {
    if (!this.docFilesArray.some(e => e.name === docFile.fileName)) {
      if (this.docFileArray === null || this.docFileArray === undefined) {
        this.zservice.downloadFile(docFile).subscribe(
          retFile => {
            saveAs(retFile, docFile.fileName);
          },
          err => {
              alert('Server error while downloading file.');
          });
      } else {
        saveAs(this.docFileArray, docFile.fileName);
      }
    } else {
      const file = this.docFilesArray.find(e => e.name === docFile.fileName);
      saveAs(file, docFile.fileName);
    }
  }
  viewFile(docFile: DocFile): void {
    if (!this.docFilesArray.some(e => e.name === docFile.fileName)) {
      if (this.docFileArray === null || this.docFileArray === undefined) {
        this.zservice.viewFile(docFile);
      } else {
        const tab = window.open();
        const url = URL.createObjectURL(this.docFileArray);
        tab.location.href = url;
      }
    } else {
      const file = this.docFilesArray.find(e => e.name === docFile.fileName);
      const tab = window.open(file);
      const url = URL.createObjectURL(file);
      tab.location.href = url;
    }
  }
  open(deleteFile) {
    this.modalService.open(deleteFile);
  }
  openOneFileModal(deleteOneFile) {
    this.modalService.open(deleteOneFile);
  }
}
