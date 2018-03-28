import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsaComponent } from './msa.component';

const routes: Routes = [
  { path: '', component: MsaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsaRoutingModule { }
