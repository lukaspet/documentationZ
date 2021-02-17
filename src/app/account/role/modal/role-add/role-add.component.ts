import { Role } from './../../../role/role';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../common/services/auth.service';
import { User } from '../../../user/user';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  addRoleForm: FormGroup;
  currentUser: User;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private authservice: AuthService) {
    this.createFormGroup();
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  onSubmit() {
        // stop here if form is invalid
    if (this.addRoleForm.invalid) {
            return;
    }
    this.activeModal.close(this.addRoleForm.value);
  }
  get f() { return this.addRoleForm.controls; }
  createFormGroup() {
    this.addRoleForm = this.fb.group({
    name: ['', [Validators.required]],
      });
    }
    ngOnInit() {
    }
}
