import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Name } from './name';

@Injectable()
export class NameService {
    
    url = environment.name_api_url;
    key = environment.name_api_key;
    
    constructor(private http:Http) { }

    addName(name:Name): Promise<Name> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    headers.append('X-Api-Key', this.key);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, name, options).toPromise()
	           .then(this.extractData)
                   .catch(this.handleErrorPromise);
    }		
    private extractData(res: Response) {
	let body = res.json();
        return body.data || {};
    }
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }	
}