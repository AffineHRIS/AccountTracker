import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { EmployeeIdName } from './employeeIdName';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class EmployeeIdNameService {

    constructor(
        private http:Http,
        private httpClient: HttpClient,
        private globals: Globals
    ){}

    getEmployeeIdName(employeeData: any): Promise<EmployeeIdName> {

        return this.httpClient.get('http://'+ this.globals.apiServerIP +':3200/employeeIdName/'+employeeData)
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    getEmployeeList(): Promise<any> {

        return this.httpClient.get('http://'+ this.globals.apiServerIP +':3200/employeeIdList/')
        .toPromise()
        .then(response => response)
        .catch(this.handleError);

    };

    sendEmail(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3200/sendMail',
            model, { headers: headers }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
