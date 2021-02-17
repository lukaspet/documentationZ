import { OfficeAddComponent } from './modal/office-add/office-add.component';
import { OfficeEditComponent } from './modal/office-edit/office-edit.component';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { Office } from './office';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  offices: Office[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getOffices();
  }
  getOffices(): void {
    this.zservice.getOffices()
    .subscribe(offices => this.offices = offices);
  }
  deleteOffice(office: Office): void {
    this.zservice.deleteOffice(office).subscribe(
      success => {
        if (success) {
          this.offices = this.offices.filter(h => h !== office);
        }
      }
    );
   }
  addOffice(nomeUfficio: string): void {
    nomeUfficio = nomeUfficio.trim();
    if (!nomeUfficio) { return; }
    this.zservice.addOffice({ nomeUfficio } as Office)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(office => {
      this.offices.push(office);
    });
  }
  editOffice(office: Office): void {
    office.nomeUfficio = office.nomeUfficio.trim();
    if (!office.nomeUfficio) { return; }
    this.zservice.editOffice(office)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(office => {
      if (!office) {this.getOffices(); }
    });
  }
  openAddOffice() {
    const modalRef = this.modalService.open(OfficeAddComponent);
    modalRef.result.then((result) => {
    this.addOffice(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditOffice(office: Office) {
    const modalRef = this.modalService.open(OfficeEditComponent);
    modalRef.componentInstance.office = office;
    modalRef.result.then((result) => {
    this.editOffice(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deleteOffice) {
    this.modalService.open(deleteOffice);
  }
  closeModal(office: Office) {
    this.modalService.dismissAll();
    this.deleteOffice(office);
  }
}
