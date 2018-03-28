import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SowComponent } from './sow.component';

const routes: Routes = [
  { path: '', component: SowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SowRoutingModule { }
