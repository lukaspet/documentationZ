import { Part3 } from './../../part3';
import { ZanuttaService } from './../../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-part3-add',
  templateUrl: './part3-add.component.html',
  styleUrls: ['./part3-add.component.css']
})
export class Part3AddComponent implements OnInit {
  addPart3Form: FormGroup;

  constructor( private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
     this.activeModal.close(this.addPart3Form.controls.part3Name.value);
  }
  createFormGroup() {
    this.addPart3Form = this.fb.group({
    part3Name: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}

