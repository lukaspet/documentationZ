import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Part3 } from './../../part3';

@Component({
  selector: 'app-part3-edit',
  templateUrl: './part3-edit.component.html',
  styleUrls: ['./part3-edit.component.css']
})
export class Part3EditComponent implements OnInit {
  editPart3Form: FormGroup;
  @Input() public part3: Part3;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
    this.activeModal.close(this.editPart3Form.value);
 }
 createFormGroup() {
   this.editPart3Form = this.fb.group({
   nomeParte3: ['', [Validators.required]],
   id: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editPart3Form.patchValue({
      nomeParte3: this.part3.nomeParte3,
      id: this.part3.id
    });
  }
}
