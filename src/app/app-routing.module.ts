import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LoginGuardGuard } from './services/guards/login-guard.guard';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const Approutes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: FullComponent,
    canActivate: [ LoginGuardGuard ],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  {
    path: '**',
    component: NopagefoundComponent
  }
];

/* @NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
}) */
export const APP_ROUTES = RouterModule.forRoot( Approutes, { useHash: true } );
