import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../router.animations';
import { LoginForm } from './loginform.interface';
import { AuthenticateService, Globals } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    username: string = '';
    password: string = '';

    constructor(
        public router: Router,
        private authService: AuthenticateService,
        private global: Globals
    ) {
    }

    ngOnInit() {
        // this.commonDataStreamService.fetchBasicDetails();
    }

    onLoggedin(model: LoginForm) {

        this.authService.authenticateUser(model)
            .subscribe(
                (response) => {
                    let body = response.json();
                    if ( body.status ) {
                        sessionStorage.setItem('isLoggedin', 'true');
                        sessionStorage.setItem('userRole', body.role);
                        sessionStorage.setItem('username', body.empid);
                        sessionStorage.setItem('empname', body.empname);
                        this.router.navigate(['/basic', body.empid]);

                    } else {
                        alert( body.message );
                        sessionStorage.removeItem('isLoggedin');
                        sessionStorage.removeItem('userRole');
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('empname');
                    }
                },
                (error) => console.log(error)
            );

    }

}
