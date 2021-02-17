import { SearchService } from './../../common/services/search.service';
import { Document } from './../document';
import { Subcategory } from './../../subcategory/subcategory';
import { Company } from './../../company/company';
import { Office } from './../../offices/office';
import { Category } from './../../category/category';
import { Part2 } from './../../part2/part2';
import { Part3 } from './../../part3/part3';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../common/services/auth.service';
import { User } from '../../account/user/user';

@Component({
  selector: 'app-document-get',
  templateUrl: './document-get.component.html',
  styleUrls: ['./document-get.component.css']
})
export class DocumentGetComponent implements OnInit {
  currentUser: User;
  documents: Document[];
  categories: Category[];
  offices: Office[];
  companies: Company[];
  subcategories: Subcategory[];
  part2: Part2[];
  part3: Part3[];
  searchDocumentForm: FormGroup;
  documentsView: any[];
  currentPage = 1;
  totalCount;

  constructor(private fb: FormBuilder, private zservice: ZanuttaService, private modalService: NgbModal, private authservice: AuthService,
              private searchService: SearchService) {
    this.createFormGroup();
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  get isAdminOrOperator() {
    return this.currentUser && (this.currentUser.role === 'Admin' || this.currentUser.role === 'Operator'
    || this.currentUser.role === 'OperatorSpa');
  }
  createFormGroup() {
    this.searchDocumentForm = this.fb.group({
    societaId: [''],
    categoriaId: [''],
    sottocategoriaId: [''],
    ufficioId: [''],
    parte2Id: [''],
    parte3Id: [''],
    dataDocumento: [''],
    searchText: [''],
    });
  }
  ngOnInit() {
    if (this.searchService.isSet) { // set reactive form group components in base of wich search function sends request
      this.setSearch();
    }
    this.getOffices();
    this.getCompanies();
    this.getCategories();
    this.getParte2();
    this.getParte3();
    if (this.searchService.isSet) {
      this.search();
    } else {
      this.getDocuments();
    }
  }
  setSearch() {
    const searchDoc = this.searchService.getSearchResult();
    this.zservice.getSubcategoriesList(searchDoc.categoriaId)
    .subscribe(subcategories => {
      this.subcategories = subcategories;
    });
    this.searchDocumentForm.patchValue({
      societaId: searchDoc.societaId,
      categoriaId: searchDoc.categoriaId,
      sottocategoriaId: searchDoc.sottocategoriaId,
      ufficioId: searchDoc.ufficioId,
      parte2Id: searchDoc.parte2Id,
      parte3Id: searchDoc.parte3Id,
      dataDocumento: searchDoc.dataDocumento,
      searchText: searchDoc.searchText });
  }
  getCategories(): void {
    this.zservice.getCategories()
    .subscribe(categories => this.categories = categories);
  }
  getSubcategories(): void {
    this.zservice.getSubcategories()
    .subscribe(subcategories => this.subcategories = subcategories);
  }
  getOffices(): void {
    this.zservice.getOffices()
    .subscribe(offices => this.offices = offices);
  }
  getCompanies(): void {
    this.zservice.getCompanies()
    .subscribe(companies => this.companies = companies);
  }
  getParte2(): void {
    this.zservice.getPart2()
    .subscribe(part2 => {
      this.part2 = part2;
      this.part2.sort((a, b) => a.nomeParte2.localeCompare(b.nomeParte2));
      });
  }
  getParte3(): void {
    this.zservice.getPart3()
    .subscribe(part3 => {
      this.part3 = part3;
      this.part3.sort((a, b) => a.nomeParte3.localeCompare(b.nomeParte3));
    });
  }
  getDocuments(): void {
    this.zservice.getDocuments()
    .subscribe((result: any) => {
      this.documents = result.body;
      this.totalCount = JSON.parse(result.headers.get('X-Pagination'));
    });
  }
  deleteDocument(document: Document): void {
    this.documents = this.documents.filter(h => h !== document);
    this.zservice.deleteDocument(document).subscribe();
  }
  open(deleteDocument) {
    this.modalService.open(deleteDocument);
  }
  closeModal(document: Document) {
    this.modalService.dismissAll();
    this.deleteDocument(document);
  }
  public companyName(document: Document): string {
    if (this.companies !== undefined) {
      const comName = this.companies.find(e => e.id === document.societaId).nomeSocieta;
      return comName;
    }
  }
  public officeName(document: Document): string {
    if (this.offices !== undefined) {
      const offName = this.offices.find(e => e.id === document.ufficioId).nomeUfficio;
      return offName;
    }
  }
  onChangeCategory(catId: number) {
    this.zservice.getSubcategoriesList(catId)
    .subscribe(subcategories => {
      this.subcategories = subcategories;
      this.searchDocumentForm.patchValue({
        sottocategoriaId: ''});
    });
  }
  // public categoryName(document: Document): string {
  //   if (this.categories !== undefined) {
  //     const catName = this.categories.find(e => e.id === document.categoriaId).nomeCategoria;
  //     return catName;
  //   }
  filter() {
    this.searchService.setSearchResult(this.searchDocumentForm.value);
    this.currentPage = 1;
    this.search();
  }
  onSearchChange(): void {
    this.searchService.setSearchResult(this.searchDocumentForm.value);
    this.search();
  }
  search() {
    this.zservice.getSearchDocument(this.searchDocumentForm.value, this.currentPage)
      .subscribe((result: any) => {
        this.documents = result.body;
        this.totalCount = JSON.parse(result.headers.get('X-Pagination'));
      });
  }
  reset() {
    this.searchDocumentForm.patchValue({
      societaId: '',
      categoriaId: '',
      sottocategoriaId: '',
      ufficioId: '',
      parte2Id: '',
      parte3Id: '',
      dataDocumento: '',
      searchText: '',
    });
    this.searchService.clearSearchResutl();
    this.subcategories = null;
    this.getDocuments();
  }
  pageChanged(event) {
    this.currentPage = event;
    this.search();
  }
}
