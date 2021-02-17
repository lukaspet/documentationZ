import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  addCategoryForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
     this.activeModal.close(this.addCategoryForm.value);
  }
  createFormGroup() {
    this.addCategoryForm = this.fb.group({
    nomeCategoria: ['', [Validators.required]],
    descrizioneCategoria: [''],
    });
  }
  ngOnInit() {
  }
}
