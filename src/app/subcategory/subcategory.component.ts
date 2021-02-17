import { SubcategoryHelper } from './subcategoryHelper';
import { SubcategoryAddComponent } from './modal/subcategory-add/subcategory-add.component';
import { SubcategoryEditComponent } from './modal/subcategory-edit/subcategory-edit.component';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subcategory } from './subcategory';
import { Category } from './../category/category';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  subcategories: Subcategory[];
  subcategoriesHelper: any = [];
  categories: Category[];
  order = 'nomeCategoria';
  reverse = false;
  sortedCollection: any[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal, private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.subcategories, 'nomeSottocategoria');
  }
  ngOnInit() {
    this.getSubcategories();
  }

  getSubcategories(): void {
    this.subcategoriesHelper.length = 0;
    this.zservice.getSubcategories()
    .subscribe(subcategories => {
      this.subcategories = subcategories;
      this.zservice.getCategories()
    .subscribe(categories => {
      this.categories = categories;
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0 ; i < this.subcategories.length ; i++) {
        const subcategoryHelper: SubcategoryHelper = {
          id: this.subcategories[i].id,
          nomeSottocategoria: this.subcategories[i].nomeSottocategoria,
          descrizioneSottocategoria: this.subcategories[i].descrizioneSottocategoria,
          categoriaId: this.subcategories[i].categoriaId,
          nomeCategoria: this.categories.find(e => e.id === this.subcategories[i].categoriaId).nomeCategoria,
        };
        this.subcategoriesHelper.push(subcategoryHelper);
        }
      });
    });
  }
  deleteSubcategory(subcategory: Subcategory): void {
    this.modalService.dismissAll();
    this.zservice.deleteSubcategory(subcategory).subscribe(
      success => {
        if (success) {
          this.subcategoriesHelper = this.subcategoriesHelper.filter(h => h !== subcategory);
        }
      }
    );
   }
  addSubcategory(subcategory: Subcategory): void {
    subcategory.nomeSottocategoria = subcategory.nomeSottocategoria.trim();
    if (!subcategory.nomeSottocategoria) { return; }
    this.zservice.addSubcategory( subcategory )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(subcategory => {
        const subcategoryHelper: SubcategoryHelper = {
          id: subcategory.id,
          nomeSottocategoria: subcategory.nomeSottocategoria,
          descrizioneSottocategoria: subcategory.descrizioneSottocategoria,
          categoriaId: subcategory.categoriaId,
          nomeCategoria: this.categories.find(e => e.id === subcategory.categoriaId).nomeCategoria,
        };
        this.subcategoriesHelper.push(subcategoryHelper);
    });
  }
  editSubcategory(subcategory: Subcategory): void {
    subcategory.nomeSottocategoria = subcategory.nomeSottocategoria.trim();
    if (!subcategory.nomeSottocategoria) { return; }
    this.zservice.editSubcategory(subcategory)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(subcategory => {
      if (!subcategory) {this.getSubcategories(); }
    });
  }
  openAddSubcategory() {
    const modalRef = this.modalService.open(SubcategoryAddComponent);
    modalRef.result.then((result) => {
    this.addSubcategory(result);
    }).catch((error) => {
    });
  }
  openEditSubcategory(subcategory: Subcategory) {
    const modalRef = this.modalService.open(SubcategoryEditComponent);
    modalRef.componentInstance.subcategory = subcategory;
    modalRef.componentInstance.nomeCategory = this.categoryName(subcategory);
    modalRef.result.then((result) => {
    this.editSubcategory(result);
    }).catch((error) => {
    });
  }
  open(deleteSubcategory) {
    this.modalService.open(deleteSubcategory);
  }
  public categoryName(subcategory: Subcategory): string {
    if (this.categories !== undefined) {
      const catName = this.categories.find(e => e.id === subcategory.categoriaId).nomeCategoria;
      return catName;
    }
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
