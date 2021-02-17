import { CompanyAddComponent } from './modal/company-add/company-add.component';
import { CompanyEditComponent } from './modal/company-edit/company-edit.component';
import { OfficeService } from './../common/services/office.service';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from './company';
import { AuthService } from '../common/services/auth.service';
import { User } from '../account/user/user';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  currentUser: User;
  companies: Company[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal,
              private authservice: AuthService) {
  this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'Admin';
  }
  ngOnInit() {
    this.getCompanies();
  }
  getCompanies(): void {
    this.zservice.getCompanies()
    .subscribe(companies => this.companies = companies);
  }
  deleteCompany(company: Company): void {
    this.zservice.deleteCompany(company).subscribe(
      success => {
        if (success) {
          this.companies = this.companies.filter(h => h !== company);
        }
      }
    );
   }
  addCompany(nomeSocieta: string): void {
    nomeSocieta = nomeSocieta.trim();
    if (!nomeSocieta) { return; }
    this.zservice.addCompany({ nomeSocieta } as Company)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(office => {
      this.companies.push(office);
    });
  }
  editCompany(company: Company): void {
    company.nomeSocieta = company.nomeSocieta.trim();
    if (!company.nomeSocieta) { return; }
    this.zservice.editCompany(company)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(category => {
      if (!category) {this.getCompanies(); }
    });
  }
  openAddCompany() {
    const modalRef = this.modalService.open(CompanyAddComponent);
    modalRef.result.then((result) => {
    this.addCompany(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditCompany(company: Company) {
    const modalRef = this.modalService.open(CompanyEditComponent);
    modalRef.componentInstance.company = company;
    modalRef.result.then((result) => {
    this.editCompany(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deleteCompany) {
    this.modalService.open(deleteCompany);
  }
  closeModal(company: Company) {
    this.modalService.dismissAll();
    this.deleteCompany(company);
  }
}
