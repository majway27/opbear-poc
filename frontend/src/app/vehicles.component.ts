import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'my-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [VehicleService]
})

export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle;
  
  constructor(
    private router: Router,
    private vehicleService: VehicleService) { }

  getVehicles(): void {
    this.vehicleService.getVehicles().then(vehicles => this.vehicles = vehicles);
  }
  
  ngOnInit(): void {
    this.getVehicles();
  }
  
  onSelect(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
  }
  
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedVehicle.id]);
  }
  
}
