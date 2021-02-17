import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subcategory } from './../../subcategory';
import { Category } from '../../../category/category';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrls: ['./subcategory-edit.component.css']
})
export class SubcategoryEditComponent implements OnInit {
  editSubcategoryForm: FormGroup;
  category: Category[];
  @Input() public subcategory: Subcategory;
  @Input() public nomeCategory: string;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
    this.activeModal.close(this.editSubcategoryForm.value);
 }
 createFormGroup() {
   this.editSubcategoryForm = this.fb.group({
    nomeCategoria: ['', {disabled: true}],
    nomeSottocategoria: ['', [Validators.required]],
    descrizioneSottocategoria: [''],
    id: [''],
    categoriaId: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editSubcategoryForm.patchValue({
      nomeCategoria: this.nomeCategory,
      nomeSottocategoria: this.subcategory.nomeSottocategoria,
      descrizioneSottocategoria: this.subcategory.descrizioneSottocategoria,
      id: this.subcategory.id,
      categoriaId: this.subcategory.categoriaId
    });
  }
}
