import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class RevenueService {

    private accURL= 'http://'+ this.globals.apiServerIP +':3200/getRevenue/';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    getRevenueReport(reqObj) {

        let params = new HttpParams();
        params = params.append('start_date', reqObj.start_date);
        params = params.append('end_date', reqObj.end_date);

        return this.httpClient.get(
            this.accURL,
            {params: params}
        )
        // .toPromise()
        // .then(response => response)
        // .catch(this.handleError);

    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
