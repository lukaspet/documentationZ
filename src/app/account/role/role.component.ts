import { RoleAddComponent } from './modal/role-add/role-add.component';
import { RoleEditComponent } from './modal/role-edit/role-edit.component';
import { ZanuttaService } from './../../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../common/services/auth.service';
import { Role } from './role';
import { User } from '../user/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  currentUser: User;
  roles: Role[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal,
              private authservice: AuthService) {
      this.authservice.currentUser.subscribe(x => this.currentUser = x);
     }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  ngOnInit() {
    this.getRoles();
  }
  getRoles(): void {
    this.zservice.getRoles()
    .subscribe(roles => this.roles = roles);
  }
  deleteRole(role: Role): void {
    this.zservice.deleteRole(role).subscribe(
      success => {
        if (success) {
          this.roles = this.roles.filter(h => h !== role);
        }
      }
    );
   }
  addRole(role: Role): void {
    role.name = role.name.trim();
    if (!role.name) { return; }
    this.zservice.addRole(role)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(role => {
      this.roles.push(role);
    });
  }
  editRole(role: Role): void {
    role.name = role.name.trim();
    if (!role.name && role.id) { return; }
    this.zservice.editRole(role)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(role => {
      if (!role) {this.getRoles(); }
    });
  }
  openAddRole() {
    const modalRef = this.modalService.open(RoleAddComponent);
    modalRef.result.then((result) => {
    this.addRole(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditRole(role: Role) {
    const modalRef = this.modalService.open(RoleEditComponent);
    modalRef.componentInstance.role = role;
    modalRef.result.then((result) => {
    this.editRole(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deleteRole) {
    this.modalService.open(deleteRole);
  }
  closeModal(role: Role) {
    this.modalService.dismissAll();
    this.deleteRole(role);
  }

}
