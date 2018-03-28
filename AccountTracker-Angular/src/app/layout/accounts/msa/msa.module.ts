import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";

import { MsaRoutingModule } from './msa-routing.module';
import { MsaComponent } from './msa.component';

@NgModule({
  imports: [
    CommonModule,
    MsaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [
    MsaComponent
  ]
})
export class MsaModule { }
