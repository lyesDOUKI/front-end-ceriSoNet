import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard, authGuardLogin } from './auth/auth.guard';
import { ProfilComponent } from './auth/profil/profil.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate : [authGuardLogin]},
  {path : '', component: ProfilComponent, canActivate : [authGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Rediriger vers le composant login par défaut
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
