import { SideNavService } from './../../nav-menu/side-nav.service';
import { User } from '../../account/user/user';
import { AuthService } from './../../common/services/auth.service';
import { ZanuttaService } from '../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  user: User = {fullName: null, email: null, password: null, id: null, role: null, roleId: null};
  constructor(private formBuilder: FormBuilder, private zservice: ZanuttaService, private router: Router, private route: ActivatedRoute,
              private spinner: NgxSpinnerService, private authservice: AuthService, private sideNavService: SideNavService) {
    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);
      }
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this.sideNavService.hideSideNav = true;
    } else {
      this.router.navigate(['/home']);
    }
   }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.spinner.show();
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    this.zservice.login(this.user.email, this.user.password)
        .pipe(first())
        .subscribe(
            _ => {
              if (_ !== undefined) {
                this.router.navigate([this.returnUrl]);
                this.spinner.hide();
                this.sideNavService.hideSideNav = false;
              }
            },
            error => {
                this.spinner.hide();
                this.error = error.error;
                throw error;
            });
  }
}
