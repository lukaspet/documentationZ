import { Role } from './../../../role/role';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../common/services/auth.service';
import { User } from '../../../user/user';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  editRoleForm: FormGroup;
  currentUser: User;
  @Input() public role: Role;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private authservice: AuthService) {
    this.createFormGroup();
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
   }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  onSubmit() {
    this.activeModal.close(this.editRoleForm.value);
  }
  createFormGroup() {
   this.editRoleForm = this.fb.group({
   name: ['', [Validators.required]],
   id: [''],
   });
  }
  ngOnInit() {
    this.updateModal();
  }
  updateModal() {
    this.editRoleForm.patchValue({
      name: this.role.name,
      id: this.role.id
    });
  }
}
