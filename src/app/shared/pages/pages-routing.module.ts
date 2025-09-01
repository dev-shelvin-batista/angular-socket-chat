import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { validateGuard } from '../../core/guards/validate.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [validateGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [validateGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
