import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../containers/errors/error404/error404.component';
import { Error500Component } from '../containers/errors/error500/error500.component';

let routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: 'error404', component: Error404Component },
  { path: 'error500', component: Error500Component },
  { path: '**', redirectTo: '/error404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
