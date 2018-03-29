import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';

@Injectable()
export class FileUploadService {

    //private accURL= 'http://'+ this.globals.apiServerIP +':3100/SOWDetails';
    constructor(
      private http:Http,
      private httpClient: HttpClient,
        private globals: Globals
    ){}


    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log(files)
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
                console.log(files[i].name)
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
