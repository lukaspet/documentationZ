import { ZanuttaService } from './../../../../common/services/zanutta.service';
import { Role } from './../../../role/role';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editUserForm: FormGroup;
  @Input() public user: User;
  roles: Role[];

  constructor(private zservice: ZanuttaService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.createFormGroup();
   }
   onSubmit() {
    this.activeModal.close(this.editUserForm.value);
  }
  createFormGroup() {
   this.editUserForm = this.fb.group({
   fullName: ['', [Validators.required]],
   email: ['', [Validators.required, Validators.email]],
   id: [''],
   roleId: ['', [Validators.required]],
   });
  }
  ngOnInit() {
    this.getRoles();
    this.updateModal();
  }
  getRoles(): void {
    this.zservice.getRoles()
    .subscribe(roles => {
      this.roles = roles;
      this.editUserForm.controls.roleId.setValue(this.user.roleId);
    });
  }
  updateModal() {
    this.editUserForm.patchValue({
      fullName: this.user.fullName,
      email: this.user.email,
      id: this.user.id
    });
  }
}
