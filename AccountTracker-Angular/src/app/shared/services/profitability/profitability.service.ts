import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class ProfitabilityService {

    private accURL= 'http://'+ this.globals.apiServerIP +':3200/ProfitabilityDetails';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}

    // getProfitabilityList(accountId) {
    //   const headers = new Headers({'Content-Type': 'application/json'});
    //   return this.httpClient.get(this.accURL);
    // };
    getProfitabilityList(SOWId: string) {

        let params = new HttpParams();
        params = params.append('SOWId', SOWId);//We fetch profitability based on account

        return this.httpClient.get(
            this.accURL,
            {params: params}
        )
        // .toPromise()
        // .then(response => response)
        // .catch(this.handleError);

    };



    addProfitabilityDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://'+ this.globals.apiServerIP +':3200/api/addProfitability',
            model,
            { headers: headers }
        );
    }

    updateProfitabilityDetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(
            'http://'+ this.globals.apiServerIP +':3200/api/updateProfitability',
            model,
            { headers: headers }
        );
    }
    // Delete Profitability details.
    deleteProfitabilityDetails(P_Id) {
        var url = 'http://'+ this.globals.apiServerIP + ':3200/api/deleteProfitability/' + P_Id;
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
