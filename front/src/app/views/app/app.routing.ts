import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Error404Component } from 'src/app/containers/errors/error404/error404.component';
import { Error500Component } from 'src/app/containers/errors/error500/error500.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('../content/content.module').then(
            (m) => m.ContentModule
          ),
      },
    ],
  },
  {
    path: 'error404',
    component: Error404Component
  },
  {
    path: 'error500',
    component: Error500Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
