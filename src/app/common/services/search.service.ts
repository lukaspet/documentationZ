import { SearchDoc } from './../../helpers/search';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchDoc: SearchDoc;
  public isSet = false;

  constructor() { }

  public getSearchResult(): SearchDoc {
    return this.searchDoc;
  }
  public setSearchResult(searchDoc: SearchDoc) {
    this.searchDoc = searchDoc;
    this.isSet = true;
  }
  public clearSearchResutl() {
    this.searchDoc = null;
    this.isSet = false;
  }
}
