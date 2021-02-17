import { SharedModule } from './common/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OfficesComponent } from './offices/offices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfficeAddComponent } from './offices/modal/office-add/office-add.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddComponent } from './company/modal/company-add/company-add.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CategoryAddComponent } from './category/modal/category-add/category-add.component';
import { SubcategoryAddComponent } from './subcategory/modal/subcategory-add/subcategory-add.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
import { Part2AddComponent } from './part2/modal/part2-add/part2-add.component';
import { Part3AddComponent } from './part3/modal/part3-add/part3-add.component';
import { CategoryEditComponent } from './category/modal/category-edit/category-edit.component';
import { CompanyEditComponent } from './company/modal/company-edit/company-edit.component';
import { OfficeEditComponent } from './offices/modal/office-edit/office-edit.component';
import { Part2EditComponent } from './part2/modal/part2-edit/part2-edit.component';
import { Part3EditComponent } from './part3/modal/part3-edit/part3-edit.component';
import { SubcategoryEditComponent } from './subcategory/modal/subcategory-edit/subcategory-edit.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { TopNavComponent } from './nav-menu/top-nav/top-nav.component';
import { OrderModule } from 'ngx-order-pipe';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth-interceptor/auth.interceptor';
import { UserComponent } from './account/user/user.component';
import { RoleComponent } from './account/role/role.component';
import { UserAddComponent } from './account/user/modal/user-add/user-add.component';
import { UserEditComponent } from './account/user/modal/user-edit/user-edit.component';
import { RoleAddComponent } from './account/role/modal/role-add/role-add.component';
import { RoleEditComponent } from './account/role/modal/role-edit/role-edit.component';
import { ChangePasswordComponent } from './account/user/change-password/change-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GlobalErrorHandlerService } from './common/services/global-error-handler.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
registerLocaleData(localeIt);

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
    position: 'right',
    distance: 12
  },
  vertical: {
    position: 'top',
    distance: 12,
    gap: 10
  }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    OfficesComponent,
    OfficeAddComponent,
    CompanyComponent,
    CompanyAddComponent,
    CategoryComponent,
    SubcategoryComponent,
    CategoryAddComponent,
    SubcategoryAddComponent,
    Part2Component,
    Part3Component,
    Part2AddComponent,
    Part3AddComponent,
    CategoryEditComponent,
    CompanyEditComponent,
    OfficeEditComponent,
    Part2EditComponent,
    Part3EditComponent,
    SubcategoryEditComponent,
    NavMenuComponent,
    TopNavComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    RoleComponent,
    UserAddComponent,
    UserEditComponent,
    RoleAddComponent,
    RoleEditComponent,
    ChangePasswordComponent,
    AppLayoutComponent,
    HomeLayoutComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    OrderModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    OfficeAddComponent,
    OfficeEditComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    SubcategoryAddComponent,
    SubcategoryEditComponent,
    Part2AddComponent,
    Part2EditComponent,
    Part3AddComponent,
    Part3EditComponent,
    UserAddComponent,
    UserEditComponent,
    RoleAddComponent,
    RoleEditComponent,
    ChangePasswordComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'it-It'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    GlobalErrorHandlerService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
