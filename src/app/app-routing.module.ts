import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./@features/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'generator',
    loadChildren: () => import('./@features/generator/generator.module').then(m => m.GeneratorModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./@features/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./@features/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
