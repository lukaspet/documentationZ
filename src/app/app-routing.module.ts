import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { RoleComponent } from './account/role/role.component';
import { UserComponent } from './account/user/user.component';
import { LogoutComponent } from './login/logout/logout.component';
import { LoginComponent } from './login/login/login.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
import { CompanyComponent } from './company/company.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { OfficesComponent } from './offices/offices.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '', redirectTo: '/home', pathMatch: 'full',
        // component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule), canActivate : [AuthGuard]
      },
      {
        path: 'offices',
        component: OfficesComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'company',
        component: CompanyComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'category',
        component: CategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'subcategory',
        component: SubcategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'part2',
        component: Part2Component, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
      },
      {
        path: 'part3',
        component: Part3Component, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
      },
      {
        path: 'subcategory',
        component: SubcategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'user',
        component: UserComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
      {
        path: 'role',
        component: RoleComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
      },
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', redirectTo: '/home', pathMatch: 'full',
        // component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
    ]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
    // component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent, canActivate : [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  // {
  //   path: '', redirectTo: '/home', pathMatch: 'full',
  //   // component: HomeComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent, canActivate : [AuthGuard]
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {
  //   path: 'documents',
  //   loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule), canActivate : [AuthGuard]
  // },
  // {
  //   path: 'offices',
  //   component: OfficesComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'company',
  //   component: CompanyComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'category',
  //   component: CategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'subcategory',
  //   component: SubcategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'part2',
  //   component: Part2Component, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
  // },
  // {
  //   path: 'part3',
  //   component: Part3Component, canActivate : [AuthGuard], data: { roles: ['Admin', 'Operator']}
  // },
  // {
  //   path: 'subcategory',
  //   component: SubcategoryComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'user',
  //   component: UserComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: 'role',
  //   component: RoleComponent, canActivate : [AuthGuard], data: { roles: ['Admin']}
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
