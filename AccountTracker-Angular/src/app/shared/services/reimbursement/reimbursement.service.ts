import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class reimbursementService {

    private companyClaimDetails= 'http://'+ this.globals.apiServerIP +':3100/claimDetails';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    getClaimDetails(model : {}) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.companyClaimDetails, model,
          { headers: headers }
      );
    };

    getClaim(data:any): Promise<any> {
        return this.httpClient.get('http://'+ this.globals.apiServerIP +':3100/claimDetails/'+data)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    getFileDownload(data:any): Promise<any> {
        return this.httpClient.get('http://'+ this.globals.apiServerIP +':3100/file')
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    // getFileDownload(dataFile: {}) {
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.post(
    //         'http://'+ this.globals.apiServerIP +':3100/file',
    //         dataFile,
    //         { headers: headers }
    //     );
    // }
    addDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3100/api/addClaim',
            model,
            { headers: headers }
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
