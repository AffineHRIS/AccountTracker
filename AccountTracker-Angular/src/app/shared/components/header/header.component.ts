import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderForm } from './headerform.interface';
import { EmployeeIdNameService, EmployeeIdName } from '../../services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    employeeIdNames : EmployeeIdName;
    role: string = sessionStorage.getItem('userRole');
    employeeName: string = sessionStorage.getItem('empname');
    username: string = sessionStorage.getItem('username');
    employeedetail: string = '';

    constructor( public router: Router, private employeeIdNameService: EmployeeIdNameService ) {

    }

    ngOnInit(): void {
        // this.getEmployeeIdNames();
    }

    onLoggedout() {
        sessionStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    getEmployeeIdNames(employeeData): void {
        this.employeeIdNameService.getEmployeeIdName(employeeData).then(result => this.employeeIdNames = result[0].data);
    }

    showProfile(model: HeaderForm) {

        if( this.role === '1' ) {
            this.router.navigate(['/basic', model.employeedetail]);
        }

        this.employeedetail = '';

    }

}
