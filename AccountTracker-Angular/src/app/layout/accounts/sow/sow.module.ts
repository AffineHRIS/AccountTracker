import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";

import { SowRoutingModule } from './sow-routing.module';
import { SowComponent } from './sow.component';
import { SowProfitabilityComponent } from './sow-profitability/sow-profitability.component';

@NgModule({
  imports: [
    CommonModule,
    SowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [SowComponent, SowProfitabilityComponent]
})
export class SowModule { }
