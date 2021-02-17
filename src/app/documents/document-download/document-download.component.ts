import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Document } from './../document';
import { Subcategory } from './../../subcategory/subcategory';
import { Category } from './../../category/category';
import { Office } from '../../offices/office';
import { Company } from '../../company/company';
import { Part2 } from '../../part2/part2';
import { Part3 } from '../../part3/part3';
import { DatePipe } from '@angular/common';
import { DocFile } from '../docFile';

@Component({
  selector: 'app-document-download',
  templateUrl: './document-download.component.html',
  styleUrls: ['./document-download.component.css']
})
export class DocumentDownloadComponent implements OnInit {
  categories: Category[];
  subcategories: Subcategory[];
  offices: Office[];
  companies: Company[];
  part2: Part2[];
  part3: Part3[];
  document: Document;
  docFiles: DocFile[];
  docFile: DocFile[];
  pipe = new DatePipe('en-US');
  documentForm: FormGroup;
  file: File;

  constructor(private route: ActivatedRoute, private router: Router, private zservice: ZanuttaService, private fb: FormBuilder) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.getOffices();
    this.getCompanies();
    this.getCategories();
    this.getSubcategories();
    this.getPart2();
    this.getPart3();
    this.getDocument();
    this.getFiles();
  }
  getFiles(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zservice.getFiles(id)
    .subscribe(docFiles => {
      this.docFiles = docFiles;
      const index = this.docFiles.findIndex(e => e.master === 1);
      this.docFile = this.docFiles.filter(e => e.master === 1);
      this.docFiles.splice(index, 1);
    });
  }
  getDocument() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zservice.getDocument(id)
    .subscribe(document => {
      this.document = document;
      if (this.document !== undefined) {
      this.documentForm.patchValue({
        cartella: 'Cartella: ' + this.document.cartella,
        dataDocumento: 'Data Documento: ' + this.pipe.transform(this.document.dataDocumento, 'dd/MM/yyyy'),
        dataArchivio: 'Data Archivio: ' + this.pipe.transform(this.document.dataArchivio, 'dd/MM/yyyy'),
        descrizioneDocumento: 'Descrizione: ' + this.document.descrizioneDocumento,
        note: 'Note: ' + this.document.note,
        ufficioId: 'Ufficio: ' + this.officeName(document),
        posizioneCartella: 'Posizione in cartella: ' + this.document.posizioneCartella,
        sottocategoriaId: 'Sottocategoria: ' + this.subcategoryName(document),
        categoriaId: 'Categoria: ' + this.categoryName(document),
        societaId: 'Società: ' + this.companyName(document),
       });
      }
      if (document.parte2Id == null) {
        this.documentForm.patchValue({
          parte2Id: 'Parte 2:' });
      } else {
        this.documentForm.patchValue({
          parte2Id: 'Parte 2: ' + this.part2Name(document), });
      }
      if (document.parte3Id == null) {
        this.documentForm.patchValue({
          parte3Id: 'Parte 3:' });
      } else {
        this.documentForm.patchValue({
          parte3Id: 'Parte 3: ' + this.part3Name(document), });
      }
      if (this.document.note == null) {
        this.documentForm.patchValue({
          note: 'Note:' });
      } else {
        this.documentForm.patchValue({
          note: 'Note: ' + this.document.note, });
      }
    });
  }
  public companyName(document: Document): string {
    if (this.companies !== undefined) {
      const comName = this.companies.find(e => e.id === document.societaId).nomeSocieta;
      return comName;
    }
  }
  public categoryName(document: Document): string {
    if (this.categories !== undefined) {
      const catName = this.categories.find(e => e.id === document.categoriaId).nomeCategoria;
      return catName;
    }
  }
  public subcategoryName(document: Document): string {
    if (this.subcategories !== undefined) {
      const subName = this.subcategories.find(e => e.id === document.sottocategoriaId).nomeSottocategoria;
      return subName;
    }
  }
  public officeName(document: Document): string {
    if (this.offices !== undefined) {
      const offName = this.offices.find(e => e.id === document.ufficioId).nomeUfficio;
      return offName;
    }
  }
  public part2Name(document: Document): string {
    if (document.parte2Id === 0 || document.parte2Id === null) {
      const parte2Name = '';
      return parte2Name;
    }
    if (this.part2 !== undefined) {
      const part2Name = this.part2.find(e => e.id === document.parte2Id).nomeParte2;
      return part2Name;
    }
  }
  public part3Name(document: Document): string {
    if (document.parte3Id === 0 || document.parte3Id === null) {
      const parte3Name = '';
      return parte3Name;
    }
    if (this.part3 !== undefined) {
      const part3Name = this.part3.find(e => e.id === document.parte3Id).nomeParte3;
      return part3Name;
    }
  }
  createFormGroup() {
    this.documentForm = this.fb.group({
    societaId: ['', {disabled: true}],
    categoriaId: [''],
    sottocategoriaId: [''],
    ufficioId: [''],
    descrizioneDocumento: [''],
    oneFile: [''],
    parte2Id: [''],
    parte3Id: [''],
    dataDocumento: [new Date()],
    dataArchivio: [new Date()],
    cartella: [''],
    note: [''],
    posizioneCartella: [''],
    manyFiles: ['']
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
    .subscribe(part2 => this.part2 = part2);
  }
  getPart3(): void {
    this.zservice.getPart3()
    .subscribe(part3 => this.part3 = part3);
  }
  getSubcategoriesShown() {
    return this.subcategories;
  }
  downloadFile(docFile: DocFile): void {
    this.zservice.downloadFile(docFile).subscribe(
      retFile => {
        saveAs(retFile, docFile.fileName);
      },
      err => {
          alert('Server error while downloading file.' + err);
      }
  );
  }
  viewFile(docFile: DocFile): void {
    // const tab = window.open();
    this.zservice.viewFile(docFile);
  }
}
