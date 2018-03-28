import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class MsaService {

    private accURL= 'http://'+ this.globals.apiServerIP +':3100/MSADetails';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    // getMSAList(accountId) {
    //   const headers = new Headers({'Content-Type': 'application/json'});
    //   return this.httpClient.get(this.accURL);
    // };
    getMSAList(accountId: string) {

        let params = new HttpParams();
        params = params.append('accountId', accountId);

        return this.httpClient.get(
            this.accURL,
            {params: params}
        )
        // .toPromise()
        // .then(response => response)
        // .catch(this.handleError);

    };



    addMSADetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addMSA',
            model,
            { headers: headers }
        );
    }

    updateMSADetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            'http://'+ this.globals.apiServerIP +':3100/api/updateMSA',
            model,
            { headers: headers }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
