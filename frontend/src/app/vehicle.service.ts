import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Vehicle } from './vehicle';
import { VEHICLES } from './mock-vehicles';

@Injectable()
export class VehicleService {
    
    url = environment.vehicle_api_url;
    key = environment.vehicle_api_key;
    
    constructor(private http: Http) { } 

    getVehicles(): Promise<Vehicle[]> {
        console.log("GET WITH HEADERS");
        let headers = new Headers();
        headers.append('X-Api-Key', this.key);
        let opts = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.url, opts).toPromise()
        .then(this.extractData)
	    .catch(this.handleErrorPromise);
    }

    getVehicle(id: number): Promise<Vehicle> {
        return this.getVehicles()
        .then(vehicles => vehicles.find(vehicle => vehicle.id === id));
    }
    
    private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    
    private handleErrorPromise (error: Response | any) {
	    console.error(error.message || error);
	    return Promise.reject(error.message || error);
    }
    
}