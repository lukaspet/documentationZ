import { ZanuttaService } from './../../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../user/must-match.validator';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private readonly notifier: NotifierService;
  changePasswordForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private zservice: ZanuttaService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
    this.createFormGroup();
   }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
            return;
    }
    this.activeModal.close();
    this.zservice.changePassword(this.changePasswordForm.value)
    .subscribe(success => {
      if (success) {
        this.notifier.notify('success', success);
      }
      });
  }
  get f() { return this.changePasswordForm.controls; }
  createFormGroup() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)]],
      password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)]],
      confirmPassword: ['', [Validators.required]],
      },  {validator: MustMatch('password', 'confirmPassword')
    });
  }
}
