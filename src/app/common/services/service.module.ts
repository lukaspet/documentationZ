import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AuthService } from './auth.service';
import { DocfileService } from './docfile.service';
import { Part3Service } from './part3.service';
import { Part2Service } from './part2.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { LoggingService } from './logging.service';
import { SubcategoryService } from './subcategory.service';
import { CategoryService } from './category.service';
import { CompanyService } from './company.service';
import { ZanuttaService } from './zanutta.service';
import { DocumentService } from './document.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeService } from './office.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DocumentService,
    ZanuttaService,
    OfficeService,
    CompanyService,
    SubcategoryService,
    CategoryService,
    LoggingService,
    DocfileService,
    Part2Service,
    Part3Service,
    RoleService,
    UserService,
    AuthService,
    GlobalErrorHandlerService,
  ]
})
export class ServiceModule { }
