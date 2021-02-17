import { Role } from './../../../role/role';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZanuttaService } from './../../../../common/services/zanutta.service';
import { MustMatch } from '../../must-match.validator';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  error = '';
  roles: Role[];
  submitted = false;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private zservice: ZanuttaService) {
    this.createFormGroup();
  }
  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
    if (this.addUserForm.invalid) {
            return;
    }
    this.activeModal.close(this.addUserForm.value);
  }
  get f() { return this.addUserForm.controls; }
  createFormGroup() {
    this.addUserForm = this.fb.group({
    fullName: ['', [Validators.required]],
    roleId: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,
                   Validators.minLength(6),
                   Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)]],
    confirmPassword: ['', [Validators.required]],
                    },  {validator: MustMatch('password', 'confirmPassword')
      });
    }
    ngOnInit() {
      this.getRoles();
    }
    getRoles(): void {
      this.zservice.getRoles()
        .subscribe(roles => {
      this.roles = roles;
      this.addUserForm.controls.roleId.setValue(this.roles[0].id);
      });
    }
  }
