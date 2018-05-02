import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class AccountDetailService {

    private accURL= 'http://'+ this.globals.apiServerIP +':3200/accountDetails';
    private accURL2= 'http://'+ this.globals.apiServerIP +':3200/accountReport';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    getAccountList() {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.httpClient.get(this.accURL);
    };

    getDetailedReport() {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.httpClient.get(this.accURL2);
    };
    // getClaim(data:any): Promise<any> {
    //     return this.httpClient.get('http://'+ this.globals.apiServerIP +':3200/claimDetails/'+data)
    //         .toPromise()
    //         .then(response => response)
    //         .catch(this.handleError);
    // };
    //
    // getFileDownload(data:any): Promise<any> {
    //     return this.httpClient.get('http://'+ this.globals.apiServerIP +':3200/file')
    //         .toPromise()
    //         .then(response => response)
    //         .catch(this.handleError);
    // };


    addAccountDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3200/api/addAccount',
            model,
            { headers: headers }
        );
    }

    updateAccountDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            'http://'+ this.globals.apiServerIP +':3200/api/updateAccount',
            model,
            { headers: headers }
        );
    }

    // Delete account details.
    deleteAccountDetails(accId) {
        var url = 'http://'+ this.globals.apiServerIP + ':3200/api/deleteAccount/' + accId;
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
