import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GeneratorComponent
  }
];

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GeneratorModule { }
