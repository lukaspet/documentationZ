import { Document } from './../document';
import { Subcategory } from './../../subcategory/subcategory';
import { Category } from './../../category/category';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Office } from '../../offices/office';
import { Company } from '../../company/company';
import { Part2 } from './../../part2/part2';
import { Part3 } from './../../part3/part3';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {
 categories: Category[];
 subcategories: Subcategory[];
 offices: Office[];
 companies: Company[];
 part2: Part2[];
 part3: Part3[];
 documents: Document[];

 documentForm: FormGroup;
 files: any = [];
 singlefile: any = [];

  constructor(private fb: FormBuilder, private zservice: ZanuttaService, private router: Router
            , private spinner: NgxSpinnerService, private location: Location) {
    this.createFormGroup();
  }
  ngOnInit() {
    this.getOffices();
    this.getCompanies();
    this.getCategories();
    this.getPart2();
    this.getPart3();
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
  createFormGroup() {
    this.documentForm = this.fb.group({
    societaId: ['', [Validators.required]],
    categoriaId: ['', [Validators.required]],
    sottocategoriaId: ['', [Validators.required]],
    ufficioId: ['', [Validators.required]],
    descrizioneDocumento: ['', Validators.required],
    oneFile: ['', [Validators.required]],
    parte2Id: [''],
    parte3Id: [''],
    dataDocumento: ['', Validators.required],
    // dataArchivio: ['', [Validators.required]],
    cartella: [''],
    note: [''],
    posizioneCartella: [''],
    manyFiles: ['']
    });
  }
  onChangeCategory(catId: number) {
    this.zservice.getSubcategoriesList(catId)
    .subscribe(subcategories => {
      this.subcategories = subcategories;
      this.documentForm.patchValue({
        sottocategoriaId: ''});
    });
  }
  getSubcategoriesShown() {
    return this.subcategories;
  }
  uploadFiles(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const elements = event[index];
      if ( !this.singlefile.some(e => e.name === elements.name)) { // check if file exists in singlefile
        if (!this.files.some(e => e.name === elements.name)) { // check if file exists in files
          this.files.push(elements as File);
        }
      }
    }
  }
  uploadFile(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      if ( !this.files.some(e => e.name === element.name)) {
        // if (!this.documentForm.controls.oneFile) {
        //   this.documentForm.patchValue({
        //     oneFile: element as File,
        //   });
        // }
        this.singlefile.push(element as File);
        if (this.singlefile.length > 1) {
          this.singlefile.splice(this.singlefile.length - 2, 1);
        }
      }
    }
  }
  deleteAttachment(index) {
    this.singlefile.splice(index, 1);
    this.documentForm.patchValue({
      oneFile: '',
    });
  }
  deleteAttachments(index) {
    this.files.splice(index, 1);
    if (this.files.length === 0) {
      this.documentForm.patchValue({
        manyFiles: '',
      });
    }
  }
  addDocument(document: Document) {
    document.categoriaId = this.documentForm.get('categoriaId').value;
    document.sottocategoriaId = this.documentForm.get('sottocategoriaId').value;
    document.ufficioId = this.documentForm.get('ufficioId').value;
    document.descrizioneDocumento = this.documentForm.get('descrizioneDocumento').value;
    document.parte2Id = this.documentForm.get('parte2Id').value;
    document.societaId = this.documentForm.get('societaId').value;
    document.parte3Id = this.documentForm.get('parte3Id').value;
    document.dataDocumento = this.documentForm.get('dataDocumento').value;
    document.cartella = this.documentForm.get('cartella').value;
    document.posizioneCartella = this.documentForm.get('posizioneCartella').value;
    document.note = this.documentForm.get('note').value;
    // if (!document.parte2) { return; }
    // document.parte2 = document.parte2.trim();
    // if (!document.parte3) { return; }
    // document.parte3 = document.parte3.trim();
    if (document.cartella) {
      document.cartella = document.cartella.trim();
    }
    if (document.posizioneCartella) {
      document.posizioneCartella = document.posizioneCartella.trim();
    }
    this.spinner.show();
    this.zservice.addDocument( document, this.files, this.singlefile )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(() => {
        this.router.navigate(['/documents']);
        this.spinner.hide();
        // this.router.navigateByUrl(this.returnUrl);
      });
  }
  onSubmit() {
    console.log(this.documentForm.value);
    this.addDocument(this.documentForm.value);
    // TODO: Use EventEmitter with form value
    // console.log(this.documentForm.value);
    // alert(JSON.stringify(this.documentForm.value));
  }
  goBack() {
    this.location.back();
    // this.router.navigate(['/home']);
  }
}

