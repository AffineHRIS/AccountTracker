import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class SowService {

    private accURL= 'http://'+ this.globals.apiServerIP +':3200/SOWDetails';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    // getSOWList(accountId) {
    //   const headers = new Headers({'Content-Type': 'application/json'});
    //   return this.httpClient.get(this.accURL);
    // };
    getSOWList(MSAId: string) {

        let params = new HttpParams();
        params = params.append('MSAId', MSAId);

        return this.httpClient.get(
            this.accURL,
            {params: params}
        )
        // .toPromise()
        // .then(response => response)
        // .catch(this.handleError);

    };



    addSOWDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3200/api/addSOW',
            model,
            { headers: headers }
        );
    }

    updateSOWDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            'http://'+ this.globals.apiServerIP +':3200/api/updateSOW',
            model,
            { headers: headers }
        );
    }
    // Delete SOW details.
    deleteSOWDetails(SOWId) {
        var url = 'http://'+ this.globals.apiServerIP + ':3200/api/deleteSOW/' + SOWId;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.delete(url).toPromise()
        .then(response => {
          return response;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
