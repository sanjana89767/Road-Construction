import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
          import('./page-view/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
];
