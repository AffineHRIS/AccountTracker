import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RevenueComponent } from './revenue.component';
import { ExpectedRevenueComponent } from './components/expected/expected.component';
import { ActualRevenueComponent } from './components/actual/actual.component';
import { RevenueRoutingModule } from './revenue-routing.module';
//import { PageHeaderModule } from '../../../../shared';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule} from "@angular/http";
@NgModule({
    imports: [
        CommonModule,
        RevenueRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DataTableModule,
        NgbModule.forRoot(),
    ],
    declarations: [RevenueComponent,ExpectedRevenueComponent,ActualRevenueComponent]
})
export class RevenueModule { }
