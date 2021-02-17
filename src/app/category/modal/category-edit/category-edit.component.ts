import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from './../../category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  editCategoryForm: FormGroup;
  @Input() public category: Category;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
    this.activeModal.close(this.editCategoryForm.value);
 }
 createFormGroup() {
   this.editCategoryForm = this.fb.group({
   nomeCategoria: ['', [Validators.required]],
   descrizioneCategoria: [''],
   id: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editCategoryForm.patchValue({
      nomeCategoria: this.category.nomeCategoria,
      descrizioneCategoria: this.category.descrizioneCategoria,
      id: this.category.id
    });
  }
}
