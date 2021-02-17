import { Part3AddComponent } from './modal/part3-add/part3-add.component';
import { Part3EditComponent } from './modal/part3-edit/part3-edit.component';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Part3 } from './part3';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.css']
})
export class Part3Component implements OnInit {
  part3: Part3[];
  order = 'nomeParte3';
  reverse = false;
  sortedCollection: any[];

  constructor(private zservice: ZanuttaService, private modalService: NgbModal, private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.part3, 'nomeParte3');
    console.log(this.sortedCollection);
   }

  ngOnInit() {
    this.getPart3();
  }
  getPart3(): void {
    this.zservice.getPart3()
    .subscribe(part3 => this.part3 = part3);
  }
  deletePart3(part3: Part3): void {
    this.zservice.deletePart3(part3).subscribe(success => {
      if (success) {
        this.part3 = this.part3.filter(h => h !== part3);
      }
    });
   }
  addPart3(nomeParte3: string): void {
    nomeParte3 = nomeParte3.trim();
    if (!nomeParte3) { return; }
    this.zservice.addPart3({ nomeParte3 } as Part3)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(part3 => {
      this.part3.push(part3);
    });
  }
  editPart3(part3: Part3): void {
    part3.nomeParte3 = part3.nomeParte3.trim();
    if (!part3.nomeParte3) { return; }
    this.zservice.editPart3(part3)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(part3 => {
      if (!part3) {this.getPart3(); }
    });
  }
  openAddPart3() {
    const modalRef = this.modalService.open(Part3AddComponent);
    modalRef.result.then((result) => {
    this.addPart3(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  openEditPart3(part3: Part3) {
    const modalRef = this.modalService.open(Part3EditComponent);
    modalRef.componentInstance.part3 = part3;
    modalRef.result.then((result) => {
    this.editPart3(result);
    console.log(result);
    }).catch((error) => {
    console.log(error);
    });
  }
  open(deletePart3) {
    this.modalService.open(deletePart3);
  }
  closeModal(part3: Part3) {
    this.modalService.dismissAll();
    this.deletePart3(part3);
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
