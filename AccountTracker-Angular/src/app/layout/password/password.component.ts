import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PasswordService } from '../../shared';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

    Current_Password: string = "";
    New_Password: string = "";
    Confirm_New_Password: string = "";
    confirmPwdAlertMessage: string = "";
    oldNewPwdAlertMessage: string = "";
    ftlogin : boolean = false;

    @ViewChild('chPwdForm') chPwdForm: any;

    constructor(
        private passwordService: PasswordService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.ftlogin = params['lpc_at'] === "null" ? true : false;
        });
    }

    checkOldNewPassword(): void {
        if ( this.New_Password.length && this.Current_Password && this.New_Password === this.Current_Password ) {
            this.oldNewPwdAlertMessage = "Current and new passwords cannot be the same.";
        } else {
            this.oldNewPwdAlertMessage = "";
        }
    }

    checkNewPassword(): void {
        if ( this.New_Password.length && this.Confirm_New_Password && this.New_Password !== this.Confirm_New_Password ) {
            this.confirmPwdAlertMessage = "New Password and Confirm New Password fields do not match.";
        } else {
            this.confirmPwdAlertMessage = "";
        }
    }

    onSumbit(model: any) {

        this.checkOldNewPassword();
        this.checkNewPassword();

        if ( this.chPwdForm.valid && this.confirmPwdAlertMessage == "" && this.oldNewPwdAlertMessage == "" ) {
            console.log("Submitted!");

            model["username"] = sessionStorage.getItem('username');

            this.passwordService.changePassword(model)
            .subscribe(
                (response) => {
                    let body = response.json();
                    if ( body.result === "success" ) {
                        sessionStorage.removeItem('isLoggedin');
                        sessionStorage.removeItem('userRole');
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('empname');
                        this.router.navigate(['/login']);
                    }
                    alert( body.message );
                },
                (error) => console.log(error)
            );

        } else {
            alert( "Required fields are mandatory." );
        }
    }

    cancel() {
        this.chPwdForm.reset();
    }

}
