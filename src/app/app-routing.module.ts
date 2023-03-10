import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate ,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectTodash = ()=> redirectLoggedInTo(['dashboard'])
const redirectToLogin =()=> redirectUnauthorizedTo([''])
const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectTodash)
  },{
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    ...canActivate(redirectTodash)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    ...canActivate(redirectToLogin)
  },
  {
    path: 'calandrie',
    loadChildren: () => import('./dashboard/calandrie/calandrie.module').then( m => m.CalandriePageModule),
    ...canActivate(redirectToLogin)
  },

  {
    path: 'projet-info-mobile',
    loadChildren: () => import('./projet-info-mobile/projet-info-mobile.module').then( m => m.ProjetInfoMobilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

