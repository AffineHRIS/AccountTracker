import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Globals } from '../../global';

@Injectable()
export class PasswordService {

    constructor(
        private http:Http,
        private globals: Globals
    ) {}

    changePassword(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/changePassword',
            modelData,
            { headers: headers }
        );
    }

}
