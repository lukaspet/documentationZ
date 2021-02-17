import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Office } from './../../office';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css']
})
export class OfficeEditComponent implements OnInit {
  editOfficeForm: FormGroup;
  @Input() public office: Office;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
    this.activeModal.close(this.editOfficeForm.value);
 }
 createFormGroup() {
   this.editOfficeForm = this.fb.group({
   nomeUfficio: ['', [Validators.required]],
   id: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editOfficeForm.patchValue({
      nomeUfficio: this.office.nomeUfficio,
      id: this.office.id
    });
  }
}
