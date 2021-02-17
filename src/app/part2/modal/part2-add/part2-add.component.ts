import { Part2 } from './../../part2';
import { ZanuttaService } from './../../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-part2-add',
  templateUrl: './part2-add.component.html',
  styleUrls: ['./part2-add.component.css']
})
export class Part2AddComponent implements OnInit {
  addPart2Form: FormGroup;

  constructor( private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
     this.activeModal.close(this.addPart2Form.controls.nomeParte2.value);
  }
  createFormGroup() {
    this.addPart2Form = this.fb.group({
    nomeParte2: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
