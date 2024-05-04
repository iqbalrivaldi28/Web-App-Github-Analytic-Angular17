import { Routes } from '@angular/router';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { EditComponent } from './components/edit/edit.component';
import { AnalitikComponent } from './components/analitik/analitik.component';
import { publicGuard } from './guard/public.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./components/loginpage/loginpage.component').then(
        (m) => m.LoginpageComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit/edit.component').then((m) => m.EditComponent),
  },
  {
    path: 'analiitk',
    loadComponent: () =>
      import('./components/analitik/analitik.component').then(
        (m) => m.AnalitikComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    component: NotfoundpageComponent,
  },
];
