import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../common/services/auth.service';
import { User } from '../../../account/user/user';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  currentUser: User;
  addCompanyForm: FormGroup;

  constructor( private fb: FormBuilder, public activeModal: NgbActiveModal, private authservice: AuthService) {
    this.createFormGroup();
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  onSubmit() {
     this.activeModal.close(this.addCompanyForm.controls.companyName.value);
  }
  createFormGroup() {
    this.addCompanyForm = this.fb.group({
    companyName: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
