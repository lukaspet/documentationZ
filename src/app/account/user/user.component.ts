import { UserAddComponent } from './modal/user-add/user-add.component';
import { UserEditComponent } from './modal/user-edit/user-edit.component';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../common/services/auth.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  users: User[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal,
              private authservice: AuthService) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.zservice.getUsers()
    .subscribe(users => this.users = users);
  }
  deleteUser(user: User): void {
    this.zservice.deleteUser(user).subscribe(
      success => {
        if (success) {
          this.users = this.users.filter(h => h !== user);
        }
      }
    );
   }
  addUser(user: User): void {
    user.fullName = user.fullName.trim();
    if (!user.email && user.fullName) { return; }
    this.zservice.addUser(user)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(user => {
      this.users.push(user);
    });
  }
  editUser(user: User): void {
    user.fullName = user.fullName.trim();
    if (!user.fullName && user.email && user.role && user.roleId) { return; }
    this.zservice.editUser(user)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(user => {
      if (!user) {this.getUsers(); }
    });
  }
  openAddUser() {
    const modalRef = this.modalService.open(UserAddComponent);
    modalRef.result.then((result) => {
    this.addUser(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditUser(user: User) {
    const modalRef = this.modalService.open(UserEditComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((result) => {
    this.editUser(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deleteUser) {
    this.modalService.open(deleteUser);
  }
  closeModal(user: User) {
    this.modalService.dismissAll();
    this.deleteUser(user);
  }
}
