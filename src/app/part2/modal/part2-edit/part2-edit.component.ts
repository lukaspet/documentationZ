import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Part2 } from './../../part2';

@Component({
  selector: 'app-part2-edit',
  templateUrl: './part2-edit.component.html',
  styleUrls: ['./part2-edit.component.css']
})
export class Part2EditComponent implements OnInit {
  editPart2Form: FormGroup;
  @Input() public part2: Part2;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
  }
  onSubmit() {
    this.activeModal.close(this.editPart2Form.value);
 }
 createFormGroup() {
   this.editPart2Form = this.fb.group({
   nomeParte2: ['', [Validators.required]],
   id: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editPart2Form.patchValue({
      nomeParte2: this.part2.nomeParte2,
      id: this.part2.id
    });
  }
}
