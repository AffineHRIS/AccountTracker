import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueComponent } from './revenue.component';
import { RevenueRoutingModule } from './revenue-routing.module';
//import { PageHeaderModule } from '../../../../shared';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        RevenueRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [RevenueComponent]
})
export class RevenueModule { }
