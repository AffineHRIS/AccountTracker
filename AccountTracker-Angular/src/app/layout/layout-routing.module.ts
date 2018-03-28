import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    { path: '', redirectTo: '/basic', pathMatch: 'full' },
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: 'basic',
                loadChildren: './accounts/basic/basic.module#BasicModule'
            },
            {
                path: 'basic/:id',
                loadChildren: './accounts/basic/basic.module#BasicModule'
            },
            {
                path: 'password',
                loadChildren: './password/password.module#PasswordModule'
            },
            {
                path: 'msa',
                loadChildren: './accounts/msa/msa.module#MsaModule'
            },
            {
                path: 'sow',
                loadChildren: './accounts/sow/sow.module#SowModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
