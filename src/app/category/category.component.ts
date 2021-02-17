import { CategoryAddComponent } from './modal/category-add/category-add.component';
import { CategoryEditComponent } from './modal/category-edit/category-edit.component';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal) { }
  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.zservice.getCategories()
    .subscribe(categories => this.categories = categories);
  }
  deleteCategory(category: Category): void {
    this.zservice.deleteCategory(category).subscribe(
      success => {
        if (success) {
        this.categories = this.categories.filter(h => h !== category);
        }
      }
    );
   }
  addCategory(category: Category): void {
    category.nomeCategoria = category.nomeCategoria.trim();
    if (!category.nomeCategoria) { return; }
    this.zservice.addCategory( category )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(category => {
      this.categories.push(category);
    });
  }
  editCategory(category: Category): void {
    category.nomeCategoria = category.nomeCategoria.trim();
    if (!category.nomeCategoria) { return; }
    this.zservice.editCategory(category)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(category => {
      if (!category) {this.getCategories(); }
    });
  }
  openAddCategory() {
    const modalRef = this.modalService.open(CategoryAddComponent);
    modalRef.result.then((result) => {
    this.addCategory(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditCategory(category: Category) {
    const modalRef = this.modalService.open(CategoryEditComponent);
    modalRef.componentInstance.category = category;
    modalRef.result.then((result) => {
    this.editCategory(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deleteCategory) {
    this.modalService.open(deleteCategory);
  }
  closeModal(category: Category) {
    this.modalService.dismissAll();
    this.deleteCategory(category);
  }
}
