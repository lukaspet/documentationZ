import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.css']
})
export class OfficeAddComponent implements OnInit {
  addOfficeForm: FormGroup;

  constructor( private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
     this.activeModal.close(this.addOfficeForm.controls.officeName.value);
  }
  createFormGroup() {
    this.addOfficeForm = this.fb.group({
    officeName: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
