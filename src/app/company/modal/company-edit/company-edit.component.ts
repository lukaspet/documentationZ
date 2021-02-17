import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from './../../company';
import { AuthService } from '../../../common/services/auth.service';
import { User } from '../../../account/user/user';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  currentUser: User;
  editCompanyForm: FormGroup;
  @Input() public company: Company;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private authservice: AuthService) {
    this.createFormGroup();
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  onSubmit() {
    this.activeModal.close(this.editCompanyForm.value);
 }
 createFormGroup() {
   this.editCompanyForm = this.fb.group({
   nomeSocieta: ['', [Validators.required]],
   id: ['']
   });
 }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editCompanyForm.patchValue({
      nomeSocieta: this.company.nomeSocieta,
      id: this.company.id
    });
  }
}
