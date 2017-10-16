import { Component, OnInit } from '@angular/core';

import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent { 
   vehicles: Vehicle[];
    
   constructor(private vehicleService: VehicleService) { }
    
   ngOnInit(): void {
    this.vehicleService.getVehicles()
        .then(vehicles => this.vehicles = vehicles.slice(1,3));
  }

}