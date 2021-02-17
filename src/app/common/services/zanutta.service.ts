import { UserService } from './user.service';
import { User } from '../../account/user/user';
import { AuthService } from './auth.service';
import { Part3Service } from './part3.service';
import { Part2Service } from './part2.service';
import { Part2 } from './../../part2/part2';
import { Part3 } from './../../part3/part3';
import { DocfileService } from './docfile.service';
import { SubcategoryService } from './subcategory.service';
import { CategoryService } from './category.service';
import { Subcategory } from './../../subcategory/subcategory';
import { Category } from './../../category/category';
import { CompanyService } from './company.service';
import { OfficeService } from './../services/office.service';
import { Office } from '../../offices/office';
import { Injectable, Injector } from '@angular/core';
import { DocumentService } from './document.service';
import { Document } from '../../documents/document';
import { Company } from '../../company/company';
import { DocFile } from './../../documents/docFile';
import { RoleService } from './role.service';
import { Role } from './../../account/role/role';
import { ChangePassword } from '../../helpers/changePassword';

@Injectable()
export class ZanuttaService {

  private IdocumentService: DocumentService;
  public get documentService(): DocumentService {
    if (!this.IdocumentService) {
      this.IdocumentService = this.injector.get(DocumentService);
    }
    return this.IdocumentService;
  }
  private IdocfileService: DocfileService;
  public get docfileService(): DocfileService {
    if (!this.IdocfileService) {
      this.IdocfileService = this.injector.get(DocfileService);
    }
    return this.IdocfileService;
  }
  private IofficeService: OfficeService;
  public get officeService(): OfficeService {
    if (!this.IofficeService) {
      this.IofficeService = this.injector.get(OfficeService);
    }
    return this.IofficeService;
  }
  private IcompanyService: CompanyService;
  public get companyService(): CompanyService {
    if (!this.IcompanyService) {
      this.IcompanyService = this.injector.get(CompanyService);
    }
    return this.IcompanyService;
  }
  private IcategoryService: CategoryService;
  public get categoryService(): CategoryService {
    if (!this.IcategoryService) {
      this.IcategoryService = this.injector.get(CategoryService);
    }
    return this.IcategoryService;
  }
  private IsubcategoryService: SubcategoryService;
  public get subcategoryService(): SubcategoryService {
    if (!this.IsubcategoryService) {
      this.IsubcategoryService = this.injector.get(SubcategoryService);
    }
    return this.IsubcategoryService;
  }
  private Ipart2Service: Part2Service;
  public get part2Service(): Part2Service {
    if (!this.Ipart2Service) {
      this.Ipart2Service = this.injector.get(Part2Service);
    }
    return this.Ipart2Service;
  }
  private Ipart3Service: Part3Service;
  public get part3Service(): Part3Service {
    if (!this.Ipart3Service) {
      this.Ipart3Service = this.injector.get(Part3Service);
    }
    return this.Ipart3Service;
  }
  private IauthService: AuthService;
  public get authService(): AuthService {
    if (!this.IauthService) {
      this.IauthService = this.injector.get(AuthService);
    }
    return this.IauthService;
  }
  private IuserService: UserService;
  public get userService(): UserService {
    if (!this.IuserService) {
      this.IuserService = this.injector.get(UserService);
    }
    return this.IuserService;
  }
  private IroleService: RoleService;
  public get roleService(): RoleService {
    if (!this.IroleService) {
      this.IroleService = this.injector.get(RoleService);
    }
    return this.IroleService;
  }

  constructor(private injector: Injector) { }
  getDocuments() {
    return this.documentService.getDocuments();
  }
  getDocument(id: number) {
    return this.documentService.getDocument(id);
  }
  addDocument(document: Document, files: File[], file: File[]) {
    return this.documentService.addDocument(document, files , file);
  }
  updateDocument(document: Document) {
    return this.documentService.updateDocument(document);
 }
  deleteDocument(document: Document) {
     return this.documentService.deleteDocument(document);
  }
  getSearchDocument(document: Document, currentPage: number) {
    return this.documentService.getSearchDocument(document, currentPage);
  }
  getOffices() {
    return this.officeService.getOffices();
  }
  deleteOffice(office: Office) {
    return this.officeService.deleteOffice(office);
  }
  addOffice(office: Office) {
    return this.officeService.addOffice(office);
  }
  editOffice(office: Office) {
    return this.officeService.editOffice(office);
  }
  getCompanies() {
    return this.companyService.getCompanies();
  }
  deleteCompany(company: Company) {
    return this.companyService.deleteCompany(company);
  }
  addCompany(company: Company) {
    return this.companyService.addCompany(company);
  }
  editCompany(company: Company) {
    return this.companyService.editCompany(company);
  }
  getCategories() {
    return this.categoryService.getCategories();
  }
  deleteCategory(category: Category) {
    return this.categoryService.deleteCategory(category);
  }
  addCategory(category: Category) {
    return this.categoryService.addCategory(category);
  }
  editCategory(category: Category) {
    return this.categoryService.editCategory(category);
  }
  getSubcategories() {
    return this.subcategoryService.getSubcategories();
  }
  getSubcategoriesList(catId: number) {
    return this.subcategoryService.getSubcategoriesList(catId);
  }
  deleteSubcategory(subcategory: Subcategory) {
    return this.subcategoryService.deleteSubcategory(subcategory);
  }
  addSubcategory(subcategory: Subcategory) {
    return this.subcategoryService.addSubcategory(subcategory);
  }
  editSubcategory(subcategory: Subcategory) {
    return this.subcategoryService.editSubcategory(subcategory);
  }
  getFiles(id: number) {
    return this.docfileService.getFiles(id);
  }
  downloadFile(docFile: DocFile) {
    return this.docfileService.downloadFile(docFile);
  }
  addFile(position: number, id: number, master: number, file: File) {
    return this.docfileService.addFile(position, id, master, file);
  }
  deleteFile(docFile: DocFile) {
    return this.docfileService.deleteFile(docFile);
  }
  getPart2() {
    return this.part2Service.getPart2();
  }
  deletePart2(part2: Part2) {
    return this.part2Service.deletePart2(part2);
  }
  addPart2(part2: Part2) {
    return this.part2Service.addPart2(part2);
  }
  editPart2(part2: Part2) {
    return this.part2Service.editPart2(part2);
  }
  getPart3() {
    return this.part3Service.getPart3();
  }
  editPart3(part3: Part3) {
    return this.part3Service.editPart3(part3);
  }
  deletePart3(part3: Part3) {
    return this.part3Service.deletePart3(part3);
  }
  addPart3(part3: Part3) {
    return this.part3Service.addPart3(part3);
  }
  shareViewUrl(url: string) {
    return this.shareViewUrl(url);
  }
  viewFile(docFile: DocFile) {
    return this.docfileService.viewFile(docFile);
  }
  login(email: string, password: string) {
    return this.authService.login(email, password);
  }
  currentUserValue() {
    return this.authService.currentUserValue;
  }
  currentUser() {
    return this.authService.currentUser;
  }
  logout() {
    return this.authService.logout();
  }
  getUsers() {
    return this.userService.getUsers();
  }
  editUser(user: User) {
    return this.userService.editUser(user);
  }
  deleteUser(user: User) {
    return this.userService.deleteUser(user);
  }
  addUser(user: User) {
    return this.userService.addUser(user);
  }
  changePassword(changePassword: ChangePassword) {
    return this.userService.changePassword(changePassword);
  }
  getRoles() {
    return this.roleService.getRoles();
  }
  editRole(role: Role) {
    return this.roleService.editRole(role);
  }
  deleteRole(role: Role) {
    return this.roleService.deleteRole(role);
  }
  addRole(role: Role) {
    return this.roleService.addRole(role);
  }
}
