import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        PasswordRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        // NgbModule.forRoot()
    ],
    declarations: [
        PasswordComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PasswordModule { }
