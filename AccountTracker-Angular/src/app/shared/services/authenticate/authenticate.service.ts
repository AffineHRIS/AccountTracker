import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../global';

@Injectable()
export class AuthenticateService {

    private url = 'http://'+ this.globals.apiServerIP +':3100/authenticate';

    constructor(
        private http:Http,
        private globals: Globals
    ){}

    authenticateUser(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            this.url,
            model,
            { headers: headers }
        );
    }

}
