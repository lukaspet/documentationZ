import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  hideSideNav = false;
  constructor() { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
    // console.log(this.hideSideNav);
  }
}
