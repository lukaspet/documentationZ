import { Part2AddComponent } from './modal/part2-add/part2-add.component';
import { Part2EditComponent } from './modal/part2-edit/part2-edit.component';
import { ZanuttaService } from './../common/services/zanutta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Part2 } from './part2';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {
  part2: Part2[];
  order = 'nomeParte2';
  reverse = false;
  sortedCollection: any[];
  searchText: any;

  constructor(private zservice: ZanuttaService, private modalService: NgbModal) { // , private orderPipe: OrderPipe) {
    // this.sortedCollection = orderPipe.transform(this.part2, 'nomeParte2');
    // console.log(this.sortedCollection);
   }

  ngOnInit() {
    this.getPart2();
  }
  getPart2(): void {
    this.zservice.getPart2()
    .subscribe(part2 => this.part2 = part2);
  }
  deletePart2(part2: Part2): void {
    this.zservice.deletePart2(part2).subscribe(success => {
      if (success) {
        this.part2 = this.part2.filter(h => h !== part2);
      }
    });
   }
  addPart2(nomeParte2: string): void {
    nomeParte2 = nomeParte2.trim();
    if (!nomeParte2) { return; }
    this.zservice.addPart2({ nomeParte2 } as Part2)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(part2 => {
      this.part2.push(part2);
    });
  }
  editPart2(part2: Part2): void {
    part2.nomeParte2 = part2.nomeParte2.trim();
    if (!part2.nomeParte2) { return; }
    this.zservice.editPart2(part2)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(part2 => {
      if (!part2) {this.getPart2(); }
    });
  }
  openAddPart2() {
    const modalRef = this.modalService.open(Part2AddComponent);
    modalRef.result.then((result) => {
    this.addPart2(result);
    // console.log(result);
    }).catch((error) => {
    // console.log(error);
    });
  }
  openEditPart2(part2: Part2) {
    const modalRef = this.modalService.open(Part2EditComponent);
    modalRef.componentInstance.part2 = part2;
    modalRef.result.then((result) => {
    this.editPart2(result);
    // console.log(result);
    }).catch((error) => {
    // console.log(error);
    });
  }
  open(deletePart2) {
    this.modalService.open(deletePart2);
  }
  closeModal(part2: Part2) {
    this.modalService.dismissAll();
    this.deletePart2(part2);
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
