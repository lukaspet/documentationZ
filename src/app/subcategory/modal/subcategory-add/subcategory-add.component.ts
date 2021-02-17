import { ZanuttaService } from './../../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../category/category';

@Component({
  selector: 'app-subcategory-add',
  templateUrl: './subcategory-add.component.html',
  styleUrls: ['./subcategory-add.component.css']
})
export class SubcategoryAddComponent implements OnInit {
  addSubcategoryForm: FormGroup;
  categories: Category[];

  constructor( private fb: FormBuilder, public activeModal: NgbActiveModal, private zservice: ZanuttaService) {
    this.createFormGroup();
  }
  onSubmit() {
     this.activeModal.close(this.addSubcategoryForm.value);
  }
  createFormGroup() {
    this.addSubcategoryForm = this.fb.group({
    nomeSottocategoria: ['', [Validators.required]],
    categoriaId: ['', [Validators.required]],
    descrizioneSottocategoria: [''],
    });
  }
  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.zservice.getCategories()
    .subscribe(categories => {
      this.categories = categories;
      this.addSubcategoryForm.controls.categoriaId.setValue(this.categories[0].id);
    });
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
